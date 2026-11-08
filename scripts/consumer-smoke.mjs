import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdtemp, readFile, realpath, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(join(root, 'package.json'));
const scratch = await mkdtemp(join(tmpdir(), 'sangyu-consumer-'));
const consumer = join(scratch, 'consumer');

function run(command, args, cwd = root) {
	console.log(`\n> ${command} ${args.join(' ')}`);
	const result = spawnSync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, NODE_PATH: '' } });
	if (result.error) throw result.error;
	assert.equal(result.status, 0, `${command} failed (status ${result.status}, signal ${result.signal})`);
}

async function json(path) {
	return JSON.parse(await readFile(path, 'utf8'));
}

function lockedPackages(lockfile) {
	assert.match(lockfile, /^lockfileVersion: '9\.0'/);
	const packages = lockfile.split('\npackages:\n')[1]?.split('\nsnapshots:\n')[0];
	assert.ok(packages, 'Expected pnpm v9 package records');
	return new Set(Array.from(packages.matchAll(/^  (.+):$/gm), (match) => match[1].replace(/^'|'$/g, '')));
}

try {
	console.log(`Consumer smoke artifacts: ${scratch}`);
	const dependencies = {};
	for (const name of ['vue', 'vite', '@vitejs/plugin-vue', 'typescript', 'vue-tsc']) {
		const manifestPath = await realpath(require.resolve(`${name}/package.json`));
		assert.ok(
			manifestPath.startsWith(join(root, 'node_modules') + sep),
			`${name} must be installed in this worktree: ${manifestPath}`,
		);
		dependencies[name] = (await json(manifestPath)).version;
	}
	const iconsTarball = join(scratch, 'icons.tgz');
	const uiTarball = join(scratch, 'ui.tgz');
	run('pnpm', ['pack', '--out', iconsTarball], join(root, 'packages/icons'));
	run('pnpm', ['pack', '--out', uiTarball], join(root, 'packages/sangyu-ui'));
	await cp(join(root, 'tests/consumer/fixture'), consumer, { recursive: true });
	dependencies['@sangyu-ui/icons'] = 'file:../icons.tgz';
	dependencies['sangyu-ui'] = 'file:../ui.tgz';
	const uiRequire = createRequire(join(root, 'packages/sangyu-ui/package.json'));
	const overrides = { '@sangyu-ui/icons': dependencies['@sangyu-ui/icons'] };
	for (const name of Object.keys((await json(join(root, 'packages/sangyu-ui/package.json'))).dependencies)) {
		if (name === '@sangyu-ui/icons') continue;
		let directory = dirname(uiRequire.resolve(name));
		while ((await json(join(directory, 'package.json')).catch(() => ({}))).name !== name) {
			const parent = dirname(directory);
			assert.notEqual(parent, directory, `Cannot find installed manifest for ${name}`);
			directory = parent;
		}
		assert.ok((await realpath(directory)).startsWith(join(root, 'node_modules') + sep));
		overrides[name] = (await json(join(directory, 'package.json'))).version;
	}
	await writeFile(
		join(consumer, 'package.json'),
		JSON.stringify({ private: true, type: 'module', dependencies, pnpm: { overrides } }, null, 2) + '\n',
	);
	const expected = await json(join(consumer, 'public-exports.json'));
	await writeFile(
		join(consumer, 'public-types.ts'),
		Object.entries(expected)
			.map(
				([name, exports], index) =>
					`export const exports${index}: Array<keyof typeof import(${JSON.stringify(name)})> = ${JSON.stringify(exports)};`,
			)
			.join('\n') + '\n',
	);
	const rootLock = await readFile(join(root, 'pnpm-lock.yaml'), 'utf8');
	await writeFile(join(consumer, 'pnpm-lock.yaml'), rootLock.replace(/\n  packages\/[\s\S]*?(?=\npackages:\n)/, ''));
	run('pnpm', ['install', '--lockfile-only', '--prefer-offline', '--ignore-workspace', '--ignore-scripts'], consumer);
	const consumerLock = await readFile(join(consumer, 'pnpm-lock.yaml'), 'utf8');
	assert.doesNotMatch(consumerLock, /(?:workspace:|link:)/);
	const allowed = lockedPackages(rootLock);
	allowed.add('@sangyu-ui/icons@file:../icons.tgz');
	allowed.add('sangyu-ui@file:../ui.tgz');
	for (const name of lockedPackages(consumerLock)) assert.ok(allowed.has(name), `Dependency version drift: ${name}`);
	run(
		'pnpm',
		['install', '--frozen-lockfile', '--prefer-offline', '--ignore-workspace', '--ignore-scripts'],
		consumer,
	);
	run(process.execPath, ['runtime.mjs'], consumer);
	run('pnpm', ['exec', 'vue-tsc', '--noEmit', '-p', 'tsconfig.json', '--pretty', 'false'], consumer);
	run(process.execPath, ['build.mjs'], consumer);
	const tarballs = {};
	for (const [name, path] of Object.entries({ 'sangyu-ui': uiTarball, '@sangyu-ui/icons': iconsTarball })) {
		tarballs[name] = {
			path: relative(scratch, path),
			sha256: createHash('sha256')
				.update(await readFile(path))
				.digest('hex'),
		};
	}
	const report = {
		node: process.version,
		tools: dependencies,
		rootLockSha256: createHash('sha256').update(rootLock).digest('hex'),
		overrides,
		tarballs,
		runtime: await json(join(consumer, 'runtime-report.json')),
		measurements: await json(join(consumer, 'measurements.json')),
	};
	await writeFile(join(scratch, 'report.json'), JSON.stringify(report, null, 2) + '\n');
	console.log(`\nConsumer smoke passed. Report: ${join(scratch, 'report.json')}`);
} catch (error) {
	console.error(error);
	console.error(`Consumer smoke failed. Artifacts retained: ${scratch}`);
	process.exitCode = 1;
}
