import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import { build } from 'vite';

const rootFile = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));
const chrome =
	process.env.CHROME_BIN ??
	(process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');

test('published themes resolve in Chrome', async (t) => {
	const style = await readFile(rootFile('packages/sangyu-ui/dist/style.css'), 'utf8');
	const bundle = await build({
		configFile: false,
		logLevel: 'error',
		define: { 'process.env.NODE_ENV': '"production"' },
		resolve: {
			alias: {
				'sangyu-ui': rootFile('packages/sangyu-ui/dist/index.js'),
				'@sangyu-ui/icons': rootFile('packages/icons/dist/index.js'),
			},
		},
		build: {
			write: false,
			lib: { entry: rootFile('tests/browser/theme-fixture.mjs'), name: 'SangyuThemeFixture', formats: ['iife'] },
		},
	});
	const entry = bundle[0].output.find((file) => file.type === 'chunk' && file.isEntry);
	assert.ok(entry, 'Expected a browser fixture bundle');

	const scratch = await mkdtemp(join(tmpdir(), 'sangyu-theme-browser-'));
	t.after(() => rm(scratch, { recursive: true, force: true, maxRetries: 3 }));
	const page = join(scratch, 'theme.html');
	await writeFile(
		page,
		`<!doctype html><meta charset="utf-8"><style>${style}\n#themed-button { transition: none; }</style><div id="app"></div><pre id="theme-test-result">null</pre><script>${entry.code.replace(/<\/script/gi, '<\\/script')}</script>`,
	);
	const { stdout } = await promisify(execFile)(
		chrome,
		[
			'--headless',
			'--disable-gpu',
			'--disable-background-networking',
			'--no-first-run',
			'--no-default-browser-check',
			`--user-data-dir=${join(scratch, 'profile')}`,
			'--dump-dom',
			pathToFileURL(page).href,
		],
		{ timeout: 30_000, maxBuffer: 4 * 1024 * 1024 },
	);
	const result = JSON.parse(stdout.match(/<pre id="theme-test-result">([^<]*)<\/pre>/)?.[1] ?? 'null');
	assert.ok(result, 'The browser fixture did not finish');
	assert.ifError(result.error);

	await t.test('propagates a reactive base color to a component in an inheriting Provider', () => {
		assert.deepEqual(result.values.inheritance, {
			initialButtonColor: 'rgb(112, 64, 176)',
			updatedButtonColor: 'rgb(134, 96, 170)',
			inlineStyle: null,
		});
	});
	await t.test('resets inherited overrides at a nested light boundary', () => {
		assert.deepEqual(result.values.lightBoundary, { background: '#f5f5f5', spacing: '4px' });
	});
	await t.test('applies the originating preset and overrides to detached overlays', () => {
		assert.deepEqual(result.values.drawer, { insideApp: false, background: '#141414', panelBackground: '#112233' });
		assert.deepEqual(result.values.notification, {
			insideApp: false,
			background: '#141414',
			successColor: '#115533',
		});
	});
});
