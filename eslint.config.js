// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import configPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineFlatConfig } from 'eslint-define-config';
import * as parserTs from '@typescript-eslint/parser';
import pluginTs from '@typescript-eslint/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

const { rules: vueRecommendedRules = {} } = pluginVue.configs['vue3-recommended'];

export default defineFlatConfig([
	{
		ignores: ['**/.*', '**/dist/**', '**/node_modules/**'],
	},
	{
		files: ['**/*.{ts,tsx,js,jsx,vue}'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: parserTs,
				ecmaVersion: 'latest',
				sourceType: 'module',
				extraFileExtensions: ['.vue'],
			},
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
		plugins: {
			'@typescript-eslint': pluginTs,
			prettier: pluginPrettier,
			vue: pluginVue,
		},
		rules: {
			...js.configs.recommended.rules,
			...pluginTs.configs.strict.rules,
			...vueRecommendedRules,
			...configPrettier.rules,
			'prettier/prettier': [
				'error',
				{},
				{
					usePrettierrc: true,
					fileInfoOptions: { withNodeModules: true },
				},
			],
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
]);
