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

for (const entry of ['baseline', 'single-component', 'single-icon', 'main']) {
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
					for (const chunk of chunks) {
						for (const [id, module] of Object.entries(chunk.modules)) {
							if (!/\/node_modules\/(?:sangyu-ui|@sangyu-ui\/icons)\//.test(id)) continue;
							assert.ok((await realpath(id)).startsWith(join(root, 'node_modules') + sep), id);
							assert.ok(id.includes('/dist/'), id);
							packageModules.push({ id, ...module });
						}
					}
					const retainedNameStrings = {};
					for (const [name, exports] of Object.entries(expected)) {
						retainedNameStrings[name] = exports.filter(
							(value) =>
								value.startsWith('Sy') && (code.includes(`"${value}"`) || code.includes(`'${value}'`)),
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
					if (entry === 'single-icon' || entry === 'main') {
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
console.log('Isolated Vite builds and explicit CSS checks passed; tree-shaking evidence: measurements.json');
