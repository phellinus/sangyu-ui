import { execFileSync } from 'node:child_process';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

export function installCloudbase({ execute = execFileSync, cwd = process.cwd() } = {}) {
	// CloudBase checks out the configured branch before this step, but its
	// installation workspace may contain only source files, without .git metadata.
	execute('npx', ['--yes', 'pnpm@10.18.3', 'install', '--frozen-lockfile'], { cwd, stdio: 'inherit' });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		installCloudbase();
	} catch (error) {
		console.error(error.message);
		process.exitCode = error.status || 1;
	}
}
