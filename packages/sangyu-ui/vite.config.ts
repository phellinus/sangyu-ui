import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';

const resolveFromPackage = (relativePath: string) => fileURLToPath(new URL(relativePath, import.meta.url));

const externalPackages = ['vue', '@sangyu-ui/icons', '@floating-ui/vue', '@v-c/utils', 'async-validator', 'lodash-es'];

export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		dts({
			tsconfigPath: resolveFromPackage('./tsconfig.build.json'),
			include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
			exclude: ['src/**/demos/**', 'src/**/test/**', 'src/**/__tests__/**', 'src/**/*.test.ts'],
			pathsToAliases: false,
			bundleTypes: {
				// 将私有工具包涉及的类型合并到主包声明文件中
				bundledPackages: ['@sangyu-ui/utils'],
			},
			afterDiagnostic(diagnostics) {
				// 避免类型错误被忽略后继续生成可发布产物
				if (diagnostics.length > 0) throw new Error('组件库类型声明生成失败');
			},
		}),
	],
	resolve: {
		alias: [
			{
				// 主包样式需要包含图标组件的基础样式
				find: '@sangyu-ui/icons/style.css',
				replacement: resolveFromPackage('../icons/src/style.css'),
			},
			{
				find: '@sangyu-ui/utils',
				replacement: resolveFromPackage('../utils/src/index.ts'),
			},
		],
	},
	define: {
		__DEV__: 'false',
	},
	build: {
		target: 'es2019',
		lib: {
			entry: resolveFromPackage('./src/index.ts'),
			formats: ['es', 'cjs'],
			fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
			cssFileName: 'style',
		},
		rollupOptions: {
			// 公开依赖和 Vue 不进入主包产物
			external: externalPackages,
			output: {
				exports: 'named',
			},
		},
	},
});
