import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';

const resolveFromPackage = (relativePath: string) => fileURLToPath(new URL(relativePath, import.meta.url));

export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: resolveFromPackage('./tsconfig.build.json'),
			include: ['src/**/*.ts', 'src/**/*.vue'],
			exclude: ['src/**/demos/**', 'src/**/test/**', 'src/**/*.test.ts'],
			pathsToAliases: false,
			bundleTypes: {
				// 将私有工具包涉及的类型合并到图标声明文件中
				bundledPackages: ['@sangyu-ui/utils'],
			},
			afterDiagnostic(diagnostics) {
				// 避免类型错误被忽略后继续生成可发布产物
				if (diagnostics.length > 0) throw new Error('图标包类型声明生成失败');
			},
		}),
	],
	resolve: {
		alias: [
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
			// Vue 由使用者的项目提供以避免重复安装
			external: ['vue'],
			output: {
				exports: 'named',
			},
		},
	},
});
