import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'SangyuUI',
	description: 'This is a Sangyu Component library',
	rewrites: {
		'docs/(.*)': '(.*)',
		'packages/sangyu-ui/src/:comp/(.*)': 'components/:comp/(.*)',
		'packages/utils/src/(.*)': 'utils/(.*)',
		'packages/icons/docs/(.*)': 'components/icons/(.*)',
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '首页', link: '/' },
			{ text: '介绍', link: '/introduce' },
			{ text: '组件', link: '/components/' },
			{ text: '工具', link: '/utils/' },
		],
		sidebar: {
			'/components/': [
				{
					text: 'SyButton 按钮',
					link: '/components/button/',
				},
				{
					text: 'SyIcon 图标',
					link: '/components/icons/',
				},
				{
					text: 'SyInput输入框',
					link: '/components/input/',
				},
				{
					text: 'SyTooltip 提示',
					link: '/components/tooltip/',
				},
				{
					text: 'SyTable 表格',
					link: '/components/table/',
				},
				{
					text: 'Notification 通知',
					link: '/components/notification/',
				},
				{
					text: 'SyCard 卡片',
					link: '/components/card/',
				},
				{
					text: 'SyTag 标签',
					link: '/components/tag/',
				},
				{
					text: 'SyBreadCrumb 面包屑',
					link: '/components/breadcrumb/',
				},
				{
					text: 'SyMenu 菜单',
					link: '/components/menu/',
				},
                {
                    text: 'SyAvatar 头像',
                    link: '/components/avatar/'
                },
                {
                    text: 'SyStep 步骤',
                    link: '/components/step/'
                },
                {
                    text: 'SyProgress 进度条',
                    link: '/components/progress/'
                },
                {
                    text: 'SyDivider 分割线',
                    link: '/components/divider/'
                },
                {
                    text: 'SyResult 结果',
                    link: '/components/result/'
                }
			],
			'/utils/': [
				{
					text: 'genClass',
					link: '/utils/gen-class',
				},
			],
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/phellinus' }],
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2025-present eastern',
		},
		docFooter: {
			prev: '上一页',
			next: '下一页',
		},
	},
});
