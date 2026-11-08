import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const packages = [
	{ directory: 'packages/sangyu-ui', name: 'sangyu-ui' },
	{ directory: 'packages/icons', name: '@sangyu-ui/icons' },
];

function collectExportTargets(exports) {
	if (typeof exports === 'string') return [exports];
	return Object.values(exports).flatMap(collectExportTargets);
}

function collectFiles(directory) {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const entryPath = join(directory, entry.name);
		return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
	});
}

for (const { directory, name } of packages) {
	const packageDirectory = join(root, directory);
	const manifest = JSON.parse(readFileSync(join(packageDirectory, 'package.json'), 'utf8'));

	test(`${name} does not expose the retired VNode utility dependency`, () => {
		for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
			assert.equal(Object.hasOwn(manifest[field] ?? {}, '@v-c/utils'), false);
		}
		const outputDirectory = join(packageDirectory, 'dist');
		assert.ok(existsSync(outputDirectory), `${name}: missing dist; run pnpm build first`);
		for (const file of collectFiles(outputDirectory).filter((file) => /\.(?:js|ts)$/.test(file))) {
			assert.equal(readFileSync(file, 'utf8').includes('@v-c/utils'), false, file);
		}
	});

	test(`${name} declares a consistent ESM-only public entry`, () => {
		assert.equal(manifest.name, name);
		assert.equal(manifest.type, 'module');
		assert.equal(manifest.main, './dist/index.js');
		assert.equal(manifest.module, manifest.main);
		assert.equal(manifest.types, './dist/index.d.ts');
		assert.equal(manifest.exports['.'].import, manifest.main);
		assert.equal(manifest.exports['.'].default, manifest.main);
		assert.equal(manifest.exports['.'].types, manifest.types);
		assert.equal(Object.hasOwn(manifest.exports['.'], 'require'), false);
		assert.equal(manifest.style, './dist/style.css');
		assert.equal(manifest.exports['./style.css'], manifest.style);
		assert.equal(manifest.exports['./package.json'], './package.json');
		assert.ok(manifest.files.includes('dist'));
	});

	test(`${name} has nonempty files for every declared public target after building`, () => {
		const targets = new Set([
			manifest.main,
			manifest.module,
			manifest.types,
			manifest.style,
			...collectExportTargets(manifest.exports),
		]);

		for (const target of targets) {
			assert.match(target, /^\.\//);
			assert.doesNotMatch(target, /\.(?:cjs|cts)(?:\.map)?$/);
			const targetPath = join(packageDirectory, target);
			assert.ok(existsSync(targetPath), `${name}: missing ${target}; run pnpm build first`);
			const targetStat = statSync(targetPath);
			assert.ok(targetStat.isFile(), `${name}: ${target} must be a file`);
			assert.ok(targetStat.size > 0, `${name}: ${target} must not be empty`);
		}
	});

	test(`${name} build output contains no CommonJS artifacts`, () => {
		const outputDirectory = join(packageDirectory, 'dist');
		assert.ok(existsSync(outputDirectory), `${name}: missing dist; run pnpm build first`);
		const files = collectFiles(outputDirectory);
		assert.ok(files.some((file) => file.endsWith('.js')));
		assert.deepEqual(
			files.filter((file) => /\.(?:cjs|cts)(?:\.map)?$/.test(file)),
			[],
		);
	});

	test(`${name} preserves multiple ESM modules without leaking test files`, () => {
		const outputDirectory = join(packageDirectory, 'dist');
		assert.ok(existsSync(outputDirectory), `${name}: missing dist; run pnpm build first`);
		const files = collectFiles(outputDirectory);
		assert.ok(files.filter((file) => file.endsWith('.js')).length > 1);
		assert.deepEqual(
			files.filter((file) => /(?:__tests__|\.spec\.|\.test\.)/.test(file)),
			[],
		);
		assert.deepEqual(
			files.filter((file) => file.includes('/node_modules/')),
			[],
		);
	});
}
