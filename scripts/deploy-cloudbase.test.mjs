import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
	copyFileSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	realpathSync,
	rmSync,
	writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import test from 'node:test';
import { callCloudbase, createDeploymentRequest, deployCloudbase, parseApiResponse } from './deploy-cloudbase.mjs';
import { installCloudbase } from './install-cloudbase.mjs';

const env = {
	TCB_ENV_ID: 'test-env',
	GITHUB_REPOSITORY: 'phellinus/sangyu-ui',
	GITHUB_SHA: 'a'.repeat(40),
};
const created = { BuildId: '2608845749', VersionName: 'sangyu-design-ui-002' };
const quiet = { log() {}, sleep: async () => {} };

test('deploys main from the public repository without uploading a ZIP or requiring Git during installation', () => {
	const request = createDeploymentRequest(env);
	assert.equal(request.Source.Ref, 'main');
	assert.equal(request.Source.Repo, 'https://github.com/phellinus/sangyu-ui.git');
	assert.equal(request.Source.IsPrivate, false);
	assert.equal(request.BuildType, 'GIT');
	assert.equal(request.WorkingDir, '.');
	assert.equal(request.StaticConfig.BuildPath, '.');
	assert.equal(request.StaticConfig.AppPath, '/');
	assert.equal(request.StaticConfig.NodeJsVersion, '22');
	assert.equal(request.StaticConfig.CodeSource, 'github');
	assert.equal(request.StaticConfig.CodeRepo, env.GITHUB_REPOSITORY);
	assert.equal(request.StaticConfig.CodeBranch, 'main');
	assert.equal(request.Commands.InstallCmd, 'npm run cloudbase:install');
	assert.equal(request.Commands.BuildCmd, 'npm run docs:build');
	for (const command of Object.values(request.Commands)) {
		assert.doesNotMatch(command, /[;&|<>`$\n\r]/);
	}
	assert.equal(request.Commands.DeployCmd, 'tcb hosting deploy ./.vitepress/dist /');
	assert.equal('CosTimestamp' in request.Source, false);
});

test('rejects missing environment IDs and invalid repository or commit input', () => {
	for (const change of [{ TCB_ENV_ID: '' }, { GITHUB_SHA: 'main' }, { GITHUB_REPOSITORY: 'bad;command' }]) {
		assert.throws(() => createDeploymentRequest({ ...env, ...change }));
	}
});

test('installs through npm run in a source-only workspace without .git or node_modules', (t) => {
	const directory = mkdtempSync(join(tmpdir(), 'sangyu-cloudbase-source-'));
	t.after(() => rmSync(directory, { recursive: true, force: true }));
	const checkout = join(directory, 'source');
	mkdirSync(join(checkout, 'scripts'), { recursive: true });
	copyFileSync(new URL('./install-cloudbase.mjs', import.meta.url), join(checkout, 'scripts/install-cloudbase.mjs'));
	const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
	writeFileSync(
		join(checkout, 'package.json'),
		JSON.stringify({ scripts: { 'cloudbase:install': manifest.scripts['cloudbase:install'] } }),
	);
	assert.equal(existsSync(join(checkout, '.git')), false);
	assert.equal(existsSync(join(checkout, 'node_modules')), false);
	const bin = join(directory, 'bin');
	const argsFile = join(directory, 'install-args.json');
	mkdirSync(bin);
	// Any attempt to use Git must fail, even if a parent directory is a repository.
	writeFileSync(join(bin, 'git'), '#!/usr/bin/env node\nprocess.exit(99);\n', { mode: 0o755 });
	writeFileSync(
		join(bin, 'npx'),
		`#!/usr/bin/env node\nrequire('node:fs').writeFileSync(process.env.SANGYU_INSTALL_ARGS, JSON.stringify({args:process.argv.slice(2),cwd:process.cwd()}));\n`,
		{ mode: 0o755 },
	);
	const command = createDeploymentRequest(env).StaticConfig.StaticCmd.InstallCmd;
	assert.doesNotMatch(command, /[;&|<>`$\n\r]/);
	assert.equal(command.split(' ')[0], 'npm');
	execFileSync('npm', command.split(' ').slice(1), {
		cwd: checkout,
		env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, SANGYU_INSTALL_ARGS: argsFile },
		stdio: 'pipe',
	});
	assert.equal(existsSync(join(checkout, '.git')), false);
	assert.deepEqual(JSON.parse(readFileSync(argsFile, 'utf8')), {
		args: ['--yes', 'pnpm@10.18.3', 'install', '--frozen-lockfile'],
		cwd: realpathSync(checkout),
	});
	// npm must return an installation error to the cloud pipeline, not mask it.
	writeFileSync(join(bin, 'npx'), '#!/usr/bin/env node\nprocess.exit(17);\n', { mode: 0o755 });
	assert.throws(
		() =>
			execFileSync('npm', command.split(' ').slice(1), {
				cwd: checkout,
				env: { ...process.env, PATH: `${bin}:${process.env.PATH}` },
				stdio: 'pipe',
			}),
		(error) => error.status === 17,
	);
});

test('only runs the pinned package manager and preserves its installation failure', () => {
	const calls = [];
	assert.throws(
		() =>
			installCloudbase({
				cwd: '/source-workspace',
				execute: (file, args, options) => {
					calls.push({ file, args, options });
					throw new Error('frozen lockfile mismatch');
				},
			}),
		/frozen lockfile mismatch/,
	);
	assert.deepEqual(calls, [
		{
			file: 'npx',
			args: ['--yes', 'pnpm@10.18.3', 'install', '--frozen-lockfile'],
			options: { cwd: '/source-workspace', stdio: 'inherit' },
		},
	]);
});

test('parses CLI envelopes and reports API errors', () => {
	assert.deepEqual(parseApiResponse(JSON.stringify({ data: created })), created);
	assert.deepEqual(parseApiResponse(JSON.stringify({ data: { Response: created } })), created);
	assert.throws(() => parseApiResponse('{"error":{"message":"denied"}}'), /denied/);
	assert.throws(() => parseApiResponse('{"data":{"Error":{"Message":"denied"}}}'), /denied/);
});

test('parses the actual CLI format with log lines before JSON and ANSI colors', () => {
	const stdout = `CloudBase CLI 3.8.7\n\u001b[34mℹ → TCB.CreateCloudApp\u001b[39m\n${JSON.stringify({ data: created }, null, 2)}\n`;
	assert.deepEqual(parseApiResponse(stdout), created);
});

test('ignores diagnostic JSON and braces inside JSON strings', () => {
	const response = { Log: { Text: 'message with {braces} and "quotes"' } };
	const stdout = `notice {not json}\n${JSON.stringify({ diagnostic: true })}\n${JSON.stringify({ data: response })}\ntrailing diagnostic`;
	assert.deepEqual(parseApiResponse(stdout), response);
	assert.throws(() => parseApiResponse('CloudBase CLI 3.8.7\n'), /JSON response/);
});

test('preserves API error codes and request IDs even after a CLI log prefix', () => {
	const stdout = `ℹ → TCB.CreateCloudApp\n${JSON.stringify({
		data: { Response: { Error: { Code: 'InvalidParameter', Message: 'invalid repo' }, RequestId: 'request-123' } },
	})}`;
	assert.throws(() => parseApiResponse(stdout), /InvalidParameter.*invalid repo.*request-123/);
});

test('handles mixed CLI stdout through the process boundary without masking parse errors', async () => {
	const result = await callCloudbase(
		'CreateCloudApp',
		{},
		{
			execute: async () => ({ stdout: `ℹ → TCB.CreateCloudApp\n${JSON.stringify({ data: created })}` }),
		},
	);
	assert.deepEqual(result, created);
	await assert.rejects(
		callCloudbase(
			'CreateCloudApp',
			{},
			{
				execute: async () => ({ stdout: 'unexpected CLI text' }),
			},
		),
		/JSON response/,
	);
});

test('extracts structured errors from stderr on a nonzero CLI exit', async () => {
	await assert.rejects(
		callCloudbase(
			'CreateCloudApp',
			{},
			{
				execute: async () => {
					throw Object.assign(new Error('Command failed'), {
						code: 1,
						stdout: 'ℹ → TCB.CreateCloudApp',
						stderr: `error details\n${JSON.stringify({ error: { code: 'AUTH_FAILED', message: 'denied' } })}`,
					});
				},
			},
		),
		/AUTH_FAILED.*denied/,
	);
});

test('waits for remote build success instead of reporting trigger success as deployment success', async () => {
	const actions = [];
	const logs = [];
	const statuses = ['BUILDING', 'SUCCESS'];
	const result = await deployCloudbase(env, {
		...quiet,
		log: (line) => logs.push(line),
		callApi: async (action, body) => {
			actions.push(action);
			if (action === 'CreateCloudApp') return created;
			assert.equal(body.BuildId, created.BuildId);
			return { Status: statuses.shift() };
		},
	});
	assert.equal(result.BuildId, created.BuildId);
	assert(logs.some((line) => line.includes('branch main')));
	assert(logs.some((line) => line.includes(`workflow commit: ${env.GITHUB_SHA}`)));
	assert.deepEqual(actions, ['CreateCloudApp', 'DescribeCloudAppVersion', 'DescribeCloudAppVersion']);
});

test('prints the cloud build log and fails when the deployment fails', async () => {
	const logs = [];
	await assert.rejects(
		deployCloudbase(env, {
			...quiet,
			log: (line) => logs.push(line),
			callApi: async (action, body) => {
				if (action === 'CreateCloudApp') return created;
				if (action === 'DescribeCloudAppVersion') return { Status: 'FAILED' };
				assert.equal(body.BuildId, Number(created.BuildId));
				return { Log: { Text: 'pnpm install failed' } };
			},
		}),
		/deployment FAILED/,
	);
	assert(logs.includes('pnpm install failed'));
});

test('retries read failures but never duplicates a create request', async () => {
	let creates = 0;
	let queries = 0;
	await deployCloudbase(env, {
		...quiet,
		callApi: async (action) => {
			if (action === 'CreateCloudApp') {
				creates++;
				return created;
			}
			if (++queries === 1) throw new Error('temporary network error');
			return { Status: 'SUCCESS' };
		},
	});
	assert.equal(creates, 1);
	assert.equal(queries, 2);
});

test('propagates an uncertain create result without retrying it', async () => {
	let calls = 0;
	await assert.rejects(
		deployCloudbase(env, {
			...quiet,
			callApi: async () => {
				calls++;
				throw new Error('request timed out');
			},
		}),
		/request timed out/,
	);
	assert.equal(calls, 1);
});

test('fails when a build stays pending past the deadline', async () => {
	let time = 0;
	await assert.rejects(
		deployCloudbase(env, {
			...quiet,
			timeoutMs: 100,
			now: () => time,
			sleep: async () => {
				time += 100;
			},
			callApi: async (action) => (action === 'CreateCloudApp' ? created : { Status: 'BUILDING' }),
		}),
		/still pending/,
	);
});
