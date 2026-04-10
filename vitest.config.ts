import path from 'path';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitest/config';

const baseUrl = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: [
			{
				find: /^sangyu-ui/,
				replacement: path.resolve(baseUrl, 'packages/sangyu-ui/src'),
			},
			{
				find: /^@sangyu-ui\/utils/,
				replacement: path.resolve(baseUrl, 'packages/utils/src'),
			},
			{
				find: /^@sangyu-ui\/icons/,
				replacement: path.resolve(baseUrl, 'packages/icons/src'),
			},
		],
	},
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['packages/**/*.spec.{ts,tsx}'],
	},
});
