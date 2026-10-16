import { defineConfig } from 'vitepress';

import { componentCatalog } from './theme/componentCatalog';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Sangyu Design UI',
	description: '基于 Vue 3 和 TypeScript 开发的开源组件库',
	head: [
		[
			'link',
			{
				rel: 'icon',
				type: 'image/svg+xml',
				href: '/favicon.svg',
			},
		],
	],
	srcExclude: ['README.md'],
	rewrites: {
		'docs/(.*)': '(.*)',
		'packages/sangyu-ui/src/:comp/(.*)': 'components/:comp/(.*)',
		'packages/utils/src/(.*)': 'utils/(.*)',
		'packages/icons/docs/(.*)': 'components/icons/(.*)',
	},
	themeConfig: {
		logo: {
			light: '/images/sangyu-logo-light.svg',
			dark: '/images/sangyu-logo-dark.svg',
			alt: '',
		},
		sidebarMenuLabel: '组件导航',
		outline: { label: '本页目录' },
		returnToTopLabel: '返回顶部',
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '首页', link: '/' },
			{ text: '介绍', link: '/introduce/', activeMatch: '^/introduce/' },
			{ text: '组件', link: '/components/', activeMatch: '^/components/' },
			{ text: '工具', link: '/utils/', activeMatch: '^/utils/' },
		],
		sidebar: {
			'/introduce/': [
				{
					text: '开始使用',
					items: [
						{
							text: '组件库介绍',
							link: '/introduce/',
						},
						{
							text: '主题变量',
							link: '/introduce/theme',
						},
					],
				},
			],
			'/components/': [
				{ text: '组件概览', link: '/components/' },
				...componentCatalog.map((group) => ({
					text: group.title,
					collapsed: false,
					items: group.items.map((item) => ({
						text: `${item.name} ${item.label}`,
						link: item.link,
					})),
				})),
			],
			'/utils/': [
				{
					text: 'genClass',
					link: '/utils/gen-class',
				},
			],
		},

		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/phellinus/sangyu-ui',
			},
		],

		footer: {
			message: 'Released under the ISC License.',
			copyright: 'Copyright © 2026-present phellinus',
		},
		docFooter: {
			prev: '上一页',
			next: '下一页',
		},
	},
});
