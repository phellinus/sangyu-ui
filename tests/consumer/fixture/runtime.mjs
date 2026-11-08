import assert from 'node:assert/strict';
import { readFile, realpath, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from 'vue';
import * as ui from 'sangyu-ui';
import * as icons from '@sangyu-ui/icons';

const root = dirname(fileURLToPath(import.meta.url));
const expected = JSON.parse(await readFile(join(root, 'public-exports.json'), 'utf8'));
const report = {};

for (const [name, namespace] of Object.entries({ 'sangyu-ui': ui, '@sangyu-ui/icons': icons })) {
	assert.deepEqual(Object.keys(namespace).sort(), expected[name].toSorted(), `${name} public ESM exports`);
	for (const value of Object.values(namespace)) assert.notEqual(value, undefined);
	const manifestPath = fileURLToPath(import.meta.resolve(`${name}/package.json`));
	const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
	assert.equal(manifest.type, 'module');
	assert.deepEqual(Object.keys(manifest.exports).sort(), ['.', './package.json', './style.css']);
	const resolved = {};
	for (const specifier of [name, `${name}/style.css`, `${name}/package.json`]) {
		const path = await realpath(fileURLToPath(import.meta.resolve(specifier)));
		assert.ok(path.startsWith(join(root, 'node_modules') + sep), `${specifier} escaped isolated consumer: ${path}`);
		assert.ok((await readFile(path)).length > 0);
		resolved[specifier] = path;
	}
	assert.equal(
		await realpath(fileURLToPath(import.meta.resolve(name))),
		await realpath(join(dirname(manifestPath), manifest.exports['.'].import)),
	);
	const types = await realpath(join(dirname(manifestPath), manifest.exports['.'].types));
	assert.ok(types.startsWith(join(root, 'node_modules') + sep));
	assert.ok((await readFile(types)).length > 0);
	report[name] = { version: manifest.version, exports: Object.keys(namespace), resolved, types };
}

const uiEntry = fileURLToPath(import.meta.resolve('sangyu-ui'));
const nestedIcons = await realpath(createRequire(uiEntry).resolve('@sangyu-ui/icons'));
assert.equal(nestedIcons, await realpath(fileURLToPath(import.meta.resolve('@sangyu-ui/icons'))));
assert.equal(ui.default, ui.SangyuUI);
assert.equal(ui.SangyuUI.version, ui.version);
assert.equal(typeof ui.createNotification, 'function');
const app = createApp({});
app.use(ui.default);
for (const [name, component] of Object.entries(ui)) {
	if (name.startsWith('Sy') && typeof component?.install === 'function' && typeof component.name === 'string') {
		assert.equal(app.component(component.name), component);
	}
}
assert.equal(app.config.globalProperties.$notification, ui.SyNotification.info);
assert.equal(icons.getIconComponent('aim'), icons.SyAimIcon);
assert.ok(icons.listRegisteredIcons().includes('zoom-out'));
report.registeredIcons = icons.listRegisteredIcons();
await writeFile(join(root, 'runtime-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log('Packed ESM exports, plugin installation, CSS paths and local dependency resolution passed.');
