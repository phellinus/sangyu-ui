import assert from 'node:assert/strict';
import test from 'node:test';
import { createDeploymentRequest, deployCloudbase, parseApiResponse } from './deploy-cloudbase.mjs';

const env = {
	TCB_ENV_ID: 'test-env',
	GITHUB_REPOSITORY: 'phellinus/sangyu-ui',
	GITHUB_SHA: 'a'.repeat(40),
};
const created = { BuildId: '2608845749', VersionName: 'sangyu-design-ui-002' };
const quiet = { log() {}, sleep: async () => {} };

test('deploys the checked commit from the public repository without uploading a ZIP', () => {
	const request = createDeploymentRequest(env);
	assert.equal(request.Source.Ref, env.GITHUB_SHA);
	assert.equal(request.Source.Repo, 'https://github.com/phellinus/sangyu-ui.git');
	assert.equal(request.Source.IsPrivate, false);
	assert.equal(request.BuildType, 'GIT');
	assert.equal(request.WorkingDir, '.');
	assert.equal(request.StaticConfig.BuildPath, '.');
	assert.equal(request.StaticConfig.AppPath, '/');
	assert.equal(request.StaticConfig.NodeJsVersion, '22');
	assert.match(request.Commands.InstallCmd, /pnpm@10\.18\.3 install --frozen-lockfile$/);
	assert.match(request.Commands.BuildCmd, /docs:build$/);
	assert.equal(request.Commands.DeployCmd, 'tcb hosting deploy ./.vitepress/dist /');
	assert.equal('CosTimestamp' in request.Source, false);
});

test('rejects missing environment IDs and invalid repository or commit input', () => {
	for (const change of [{ TCB_ENV_ID: '' }, { GITHUB_SHA: 'main' }, { GITHUB_REPOSITORY: 'bad;command' }]) {
		assert.throws(() => createDeploymentRequest({ ...env, ...change }));
	}
});

test('parses CLI envelopes and reports API errors', () => {
	assert.deepEqual(parseApiResponse(JSON.stringify({ data: created })), created);
	assert.deepEqual(parseApiResponse(JSON.stringify({ data: { Response: created } })), created);
	assert.throws(() => parseApiResponse('{"error":{"message":"denied"}}'), /denied/);
	assert.throws(() => parseApiResponse('{"data":{"Error":{"Message":"denied"}}}'), /denied/);
});

test('waits for remote build success instead of reporting trigger success as deployment success', async () => {
	const actions = [];
	const statuses = ['BUILDING', 'SUCCESS'];
	const result = await deployCloudbase(env, {
		...quiet,
		callApi: async (action, body) => {
			actions.push(action);
			if (action === 'CreateCloudApp') return created;
			assert.equal(body.BuildId, created.BuildId);
			return { Status: statuses.shift() };
		},
	});
	assert.equal(result.BuildId, created.BuildId);
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
