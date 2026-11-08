import assert from 'node:assert/strict';
import { readFile, realpath, writeFile } from 'node:fs/promises';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import vue from '@vitejs/plugin-vue';
import { build } from 'vite';

const root = dirname(fileURLToPath(import.meta.url));
const expected = JSON.parse(await readFile(join(root, 'public-exports.json'), 'utf8'));
const measurements = {};

for (const entry of ['baseline', 'single-component', 'single-switch', 'single-icon', 'icon-by-name', 'main']) {
	await writeFile(
		join(root, 'index.html'),
		`<div id="app"></div><script type="module" src="/${entry}.ts"></script>\n`,
	);
	await build({
		root,
		configFile: false,
		plugins: [
			vue(),
			{
				name: 'consumer-evidence',
				async generateBundle(_options, bundle) {
					const chunks = Object.values(bundle).filter((file) => file.type === 'chunk');
					const css = Object.values(bundle).filter(
						(file) => file.type === 'asset' && file.fileName.endsWith('.css'),
					);
					const code = chunks.map((chunk) => chunk.code).join('\n');
					const styles = css.map((file) => String(file.source)).join('\n');
					const packageModules = [];
					const retainedPackageCode = {};
					for (const chunk of chunks) {
						for (const [id, module] of Object.entries(chunk.modules)) {
							if (!/\/node_modules\/(?:sangyu-ui|@sangyu-ui\/icons)\//.test(id)) continue;
							assert.ok((await realpath(id)).startsWith(join(root, 'node_modules') + sep), id);
							assert.ok(id.includes('/dist/'), id);
							packageModules.push({ id, ...module });
							if (module.renderedLength > 0) {
								const name = id.includes('/node_modules/sangyu-ui/') ? 'sangyu-ui' : '@sangyu-ui/icons';
								retainedPackageCode[name] =
									`${retainedPackageCode[name] ?? ''}\n${this.getModuleInfo(id)?.code ?? ''}`;
							}
						}
					}
					const retainedNameStrings = {};
					for (const [name, exports] of Object.entries(expected)) {
						retainedNameStrings[name] = exports.filter(
							(value) =>
								value.startsWith('Sy') &&
								(code.includes(`"${value}"`) || code.includes(`'${value}'`)) &&
								(retainedPackageCode[name]?.includes(`"${value}"`) ||
									retainedPackageCode[name]?.includes(`'${value}'`)),
						);
						if (!packageModules.some(({ id }) => id.includes(`/node_modules/${name}/`))) {
							retainedNameStrings[name] = [];
						}
					}
					if (entry === 'single-component' || entry === 'main') {
						assert.match(styles, /\.sy-button/);
						assert.ok(retainedNameStrings['sangyu-ui'].includes('SyButton'));
						assert.ok(packageModules.some(({ id }) => id.includes('/node_modules/sangyu-ui/')));
					}
					if (entry === 'single-icon' || entry === 'icon-by-name' || entry === 'main') {
						assert.match(styles, /\.sy-icon/);
						assert.ok(retainedNameStrings['@sangyu-ui/icons'].includes('SyAimIcon'));
						assert.ok(packageModules.some(({ id }) => id.includes('/node_modules/@sangyu-ui/icons/')));
					}
					measurements[entry] = {
						files: [...chunks, ...css].map((file) => {
							const content = file.type === 'chunk' ? file.code : file.source;
							return {
								file: file.fileName,
								bytes: Buffer.byteLength(content),
								gzipBytes: gzipSync(content).length,
							};
						}),
						retainedNameStrings,
						packageModules,
					};
				},
			},
		],
		build: { outDir: join(root, 'dist', entry), emptyOutDir: true },
	});
}

await writeFile(join(root, 'measurements.json'), JSON.stringify(measurements, null, 2) + '\n');
assert.deepEqual(measurements['single-component'].retainedNameStrings['sangyu-ui'], ['SyButton']);
assert.deepEqual(measurements['single-component'].retainedNameStrings['@sangyu-ui/icons'], []);
assert.deepEqual(measurements['single-switch'].retainedNameStrings['sangyu-ui'], ['SySwitch']);
assert.deepEqual(measurements['single-icon'].retainedNameStrings['@sangyu-ui/icons'], ['SyAimIcon']);
assert.ok(measurements['icon-by-name'].retainedNameStrings['@sangyu-ui/icons'].includes('SyZoomOut'));
for (const entry of ['single-component', 'single-switch']) {
	const retainedModules = measurements[entry].packageModules.filter((module) => module.renderedLength > 0);
	assert.equal(
		retainedModules.some((module) => /\/dist\/(?:table|menu|notification|drawer|select)\//.test(module.id)),
		false,
		`${entry} must not retain unrelated component implementations`,
	);
}
assert.equal(
	measurements['single-icon'].packageModules.some(
		(module) =>
			module.renderedLength > 0 &&
			/\/(?:registry|built-in-icons|home\.vue|zoom-out\.vue|sy-icon\.vue)\.js$/.test(module.id),
	),
	false,
	'single-icon must not retain registry initialization or unrelated icons',
);
console.log('Isolated Vite builds and explicit CSS checks passed; tree-shaking evidence: measurements.json');
