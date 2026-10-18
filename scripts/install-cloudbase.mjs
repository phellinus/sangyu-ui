import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

export function installCloudbase(sha, { execute = execFileSync, cwd = process.cwd() } = {}) {
	if (!/^[a-f0-9]{40}$/i.test(sha ?? '')) throw new Error('A full commit SHA is required');
	const options = { cwd, stdio: 'inherit' };
	// Keep the CloudBase command field to one process; execute each operation
	// separately so a failed checkout cannot continue with dependency installation.
	execute('git', ['fetch', '--depth=1', 'origin', sha], options);
	execute('git', ['checkout', '--detach', sha], options);
	const checkedOut = execute('git', ['rev-parse', 'HEAD'], {
		cwd,
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'pipe'],
	}).trim();
	if (checkedOut.toLowerCase() !== sha.toLowerCase()) {
		throw new Error('CloudBase checkout does not match the tested commit');
	}
	execute('npx', ['--yes', 'pnpm@10.18.3', 'install', '--frozen-lockfile'], options);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		installCloudbase(process.argv[2]);
	} catch (error) {
		console.error(error.message);
		process.exitCode = error.status || 1;
	}
}
