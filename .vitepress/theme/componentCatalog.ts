interface ComponentEntry {
	name: string;
	label: string;
	link: string;
	description: string;
}

interface ComponentGroup {
	id: string;
	title: string;
	description: string;
	items: ComponentEntry[];
}

/** 文档中已提供的组件入口，同时用于组件概览与侧栏导航。 */
export const componentCatalog: ComponentGroup[] = [
	{
		id: 'basic',
		title: '基础组件',
		description: '从一次点击、一枚图标开始，建立界面的基础语言。',
		items: [
			{
				name: 'SyButton',
				label: '按钮',
				link: '/components/button/',
				description: '承载操作与链接，支持多种样式、尺寸和加载状态。',
			},
			{
				name: 'SyIcon',
				label: '图标',
				link: '/components/icons/',
				description: '统一的矢量图标，支持尺寸、颜色与动态注册。',
			},
			{
				name: 'SyDivider',
				label: '分割线',
				link: '/components/divider/',
				description: '划分内容与信息层级，支持水平、垂直与文字分隔。',
			},
		],
	},
	{
		id: 'form',
		title: '表单输入',
		description: '收集信息、表达选择，让每次输入都有明确的反馈。',
		items: [
			{
				name: 'SyInput',
				label: '输入框',
				link: '/components/input/',
				description: '接收文本与密码，提供清空、图标和多种输入样式。',
			},
			{
				name: 'SySelect',
				label: '选择器',
				link: '/components/select/',
				description: '从选项中选择，支持搜索、多选与异步加载。',
			},
			{
				name: 'SyRadio',
				label: '单选框',
				link: '/components/radio/',
				description: '在一组选项中作出单一选择，支持按钮样式。',
			},
			{
				name: 'SyCheckbox',
				label: '多选框',
				link: '/components/checkbox/',
				description: '选择一个或多个选项，支持组合与不确定状态。',
			},
			{
				name: 'SySwitch',
				label: '开关',
				link: '/components/switch/',
				description: '切换即时生效的设置，清晰表达开启与关闭。',
			},
			{
				name: 'SyForm',
				label: '表单',
				link: '/components/form/',
				description: '组织输入与校验，管理表单布局、状态和提交。',
			},
		],
	},
	{
		id: 'display',
		title: '数据展示',
		description: '把内容组织成清晰的信息，让重点更容易被看见。',
		items: [
			{
				name: 'SyTable',
				label: '表格',
				link: '/components/table/',
				description: '展示结构化数据，支持固定列、滚动与自定义单元格。',
			},
			{
				name: 'SyCard',
				label: '卡片',
				link: '/components/card/',
				description: '聚合相关内容，使用标题、插槽与阴影区分层级。',
			},
			{
				name: 'SyTag',
				label: '标签',
				link: '/components/tag/',
				description: '标记分类与状态，支持颜色、尺寸与关闭操作。',
			},
			{
				name: 'SyAvatar',
				label: '头像',
				link: '/components/avatar/',
				description: '展示用户形象，支持不同尺寸、加载和角标。',
			},
			{
				name: 'SyProgress',
				label: '进度条',
				link: '/components/progress/',
				description: '呈现任务进度，提供线性与环形展示方式。',
			},
			{
				name: 'SyResult',
				label: '结果',
				link: '/components/result/',
				description: '呈现操作结果，搭配说明与后续操作引导。',
			},
		],
	},
	{
		id: 'navigation',
		title: '导航组件',
		description: '指明当前位置、操作顺序与前进方向。',
		items: [
			{
				name: 'SyBreadCrumb',
				label: '面包屑',
				link: '/components/breadcrumb/',
				description: '展示页面层级，帮助用户理解位置并返回上级。',
			},
			{
				name: 'SyMenu',
				label: '菜单',
				link: '/components/menu/',
				description: '组织多级导航，管理选中、展开与收起状态。',
			},
			{
				name: 'SySteps',
				label: '步骤条',
				link: '/components/step/',
				description: '展示流程与当前步骤，支持水平和垂直布局。',
			},
			{
				name: 'SyPagination',
				label: '分页器',
				link: '/components/pagination/',
				description: '浏览分段数据，支持页码、条数选择与快速跳转。',
			},
		],
	},
	{
		id: 'feedback',
		title: '反馈组件',
		description: '补充说明、提示状态，在需要的时候给出回应。',
		items: [
			{
				name: 'SyTooltip',
				label: '文字提示',
				link: '/components/tooltip/',
				description: '提供轻量补充信息，支持不同触发方式与位置。',
			},
			{
				name: 'SyNotification',
				label: '通知',
				link: '/components/notification/',
				description: '在页面边缘传递消息，支持类型、位置与关闭控制。',
			},
			{
				name: 'SyDrawer',
				label: '抽屉',
				link: '/components/drawer/',
				description: '展开额外内容与操作，支持不同方向和焦点管理。',
			},
		],
	},
];
