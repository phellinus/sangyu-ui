import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Sangyu UI',
	description: '基于 Vue 3 和 TypeScript 开发的开源组件库',
    head: [
		[
			'link',
			{
				rel: 'icon',
				type: 'image/png',
				href: '/favicon.png',
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
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '首页', link: '/' },
			{ text: '介绍', link: '/introduce' },
			{ text: '组件', link: '/components/' },
			{ text: '工具', link: '/utils/' },
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
					link: '/components/avatar/',
				},
				{
					text: 'SyStep 步骤',
					link: '/components/step/',
				},
				{
					text: 'SyProgress 进度条',
					link: '/components/progress/',
				},
				{
					text: 'SyDivider 分割线',
					link: '/components/divider/',
				},
				{
					text: 'SyResult 结果',
					link: '/components/result/',
				},
				{
					text: 'SyRadio 单选框',
					link: '/components/radio/',
				},
				{
					text: 'SyCheckbox 多选框',
					link: '/components/checkbox/',
				},
				{
					text: 'SySwitch 开关',
					link: '/components/switch/',
				},
				{
					text: 'SyPagination 分页器',
					link: '/components/pagination/',
				},
				{
					text: 'SySelect 选择器',
					link: '/components/select/',
				},
				{
					text: 'SyForm 表单',
					link: '/components/form/',
				},
				{
					text: 'SyDrawer 抽屉',
					link: '/components/drawer/',
				},
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
