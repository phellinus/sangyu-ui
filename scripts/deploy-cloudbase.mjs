import { execFile } from 'node:child_process';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import { setTimeout as delay } from 'node:timers/promises';

const execFileAsync = promisify(execFile);

export function createDeploymentRequest(env) {
	const { TCB_ENV_ID: envId, GITHUB_REPOSITORY: repository, GITHUB_SHA: sha } = env;
	if (!envId?.trim()) throw new Error('TCB_ENV_ID is required');
	if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? '')) {
		throw new Error('GITHUB_REPOSITORY must identify a public GitHub repository');
	}
	if (!/^[a-f0-9]{40}$/i.test(sha ?? '')) throw new Error('GITHUB_SHA must be a commit SHA');
	const commands = {
		InstallCmd: 'npx --yes pnpm@10.18.3 install --frozen-lockfile',
		BuildCmd: 'npx --yes pnpm@10.18.3 docs:build',
		DeployCmd: 'tcb hosting deploy ./.vitepress/dist /',
	};
	return {
		EnvId: envId,
		ServiceName: 'sangyu-design-ui',
		DeployType: 'static-hosting',
		BuildType: 'GIT',
		Source: {
			Type: 'git',
			Repo: `https://github.com/${repository}.git`,
			Ref: sha,
			Channel: 'git',
			IsPrivate: false,
		},
		NodeJsVersion: '22',
		WorkingDir: '.',
		Commands: commands,
		StaticConfig: {
			Framework: 'vite',
			NodeJsVersion: '22',
			BuildPath: '.',
			AppPath: '/',
			StaticCmd: commands,
		},
	};
}

export function parseApiResponse(stdout) {
	const output = JSON.parse(stdout);
	const data = output.data ?? output;
	const result = data.Response ?? data;
	const error = output.error ?? result.Error;
	if (error) throw new Error(error.message ?? error.Message ?? 'CloudBase API request failed');
	return result;
}

export async function callCloudbase(action, body) {
	try {
		const { stdout } = await execFileAsync(
			'tcb',
			['api', 'tcb', action, '--api-version', '2018-06-08', '--body', JSON.stringify(body), '--json'],
			{ timeout: 60_000, maxBuffer: 2 * 1024 * 1024 },
		);
		return parseApiResponse(stdout);
	} catch (error) {
		for (const output of [error.stdout, error.stderr]) {
			try {
				JSON.parse(output);
			} catch {
				continue;
			}
			// CLI JSON errors provide the API message without dumping command arguments.
			parseApiResponse(output);
		}
		throw new Error(`${action} failed: ${error.code ?? 'invalid API response'}`, { cause: error });
	}
}

export async function deployCloudbase(
	env,
	{ callApi = callCloudbase, sleep = delay, now = Date.now, log = console.log, timeoutMs = 20 * 60_000 } = {},
) {
	const request = createDeploymentRequest(env);
	log(`Deploying ${env.GITHUB_REPOSITORY}@${env.GITHUB_SHA} through CloudBase Git checkout`);
	// A timed-out create request may already have triggered a deployment. Never retry it blindly.
	const created = await callApi('CreateCloudApp', request);
	if (!created.BuildId || !created.VersionName) throw new Error('CloudBase returned no build identity');
	const identity = {
		EnvId: request.EnvId,
		ServiceName: request.ServiceName,
		DeployType: request.DeployType,
		BuildId: String(created.BuildId),
		VersionName: created.VersionName,
	};
	const url = new URL('https://tcb.cloud.tencent.com/dev');
	url.searchParams.set('envId', request.EnvId);
	url.hash = `/static-hosting/service/deploy/detail?${new URLSearchParams({
		serverName: request.ServiceName,
		versionName: created.VersionName,
		buildId: String(created.BuildId),
	})}`;
	log(`Build log: ${url}`);
	const deadline = now() + timeoutMs;
	let previousStatus;
	let queryFailures = 0;
	while (now() < deadline) {
		let version;
		try {
			version = await callApi('DescribeCloudAppVersion', identity);
			queryFailures = 0;
		} catch (error) {
			if (++queryFailures >= 3) throw error;
			log('Build status query failed; retrying the read request');
			await sleep(10_000);
			continue;
		}
		const status = version.Status;
		if (status !== previousStatus) log(`CloudBase build status: ${status ?? 'not yet available'}`);
		previousStatus = status;
		if (status === 'SUCCESS') return identity;
		if (['FAILED', 'FAILURE', 'CANCELED', 'CANCELLED', 'ERROR'].includes(status)) {
			try {
				const result = await callApi('DescribeCloudBaseRunBuildLog', {
					EnvId: request.EnvId,
					ServiceName: request.ServiceName,
					ServiceVersion: created.VersionName,
					BuildId: Number(created.BuildId),
					Start: 0,
				});
				log(result.Log?.Text ?? 'No build log text returned; open the build log link above');
			} catch {
				log('Build log query failed; open the build log link above');
			}
			throw new Error(`CloudBase deployment ${status}; build ${created.BuildId}`);
		}
		await sleep(10_000);
	}
	throw new Error(
		`CloudBase build ${created.BuildId} is still pending. Check its status before starting another deployment.`,
	);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	deployCloudbase(process.env).catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
