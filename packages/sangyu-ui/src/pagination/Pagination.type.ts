import { Component, CSSProperties } from 'vue';

export type PaginationSize = 'small' | 'default' | 'large';
export type PaginationShape = 'default' | 'circle' | 'square';
export type PaginationLayoutItem = 'prev' | 'pager' | 'next' | 'jumper' | 'total' | 'sizes' | 'slot' | '->';

export interface PaginationProps {
	// 当前页码；传入后组件进入受控模式，需要配合 update:currentPage 更新。
	currentPage?: number;

	// 非受控模式下的默认当前页，只在组件初始化时生效。
	defaultCurrentPage?: number;

	// 每页条数；传入后组件进入受控模式，需要配合 update:pageSize 更新。
	pageSize?: number;

	// 非受控模式下的默认每页条数，只在组件初始化时生效。
	defaultPageSize?: number;

	// 数据总条数；组件会根据 total / pageSize 自动计算总页数。
	total?: number;

	// 总页数；如果同时传入 total 和 pageCount，建议 pageCount 优先。
	pageCount?: number;

	// 最多展示的页码按钮数量；超过后自动折叠为省略号，建议为大于 4 的奇数。
	pagerCount?: number;

	// 每页条数选择器的可选项，用于 sizes 布局。
	pageSizes?: number[];

	// 分页布局配置；支持字符串逗号分隔或数组，如 prev,pager,next,jumper,total,sizes。
	layout?: string | PaginationLayoutItem[];

	// 是否禁用整个分页组件；禁用后页码、上一页、下一页、跳页等都不可交互。
	disabled?: boolean;

	// 当总页数小于等于 1 时是否隐藏整个分页。
	hideOnSinglePage?: boolean;

	// 上一页按钮的自定义文案；未传时默认显示图标。
	prevText?: string;

	// 下一页按钮的自定义文案；未传时默认显示图标。
	nextText?: string;

	// 上一页按钮的自定义图标，优先级通常高于 prevText。
	prevIcon?: string | Component;

	// 下一页按钮的自定义图标，优先级通常高于 nextText。
	nextIcon?: string | Component;

	// 激活态主题色，用于当前页高亮块、进度条、loading 等视觉元素。
	color?: string;

	// 分页按钮形状，可选默认圆角、圆形或方形。
	shape?: PaginationShape;

	// 是否移除页码按钮之间的间距，使按钮贴合显示。
	notMargin?: boolean;

	// 是否启用圆点模式；启用后页码不显示数字，只显示圆点。
	buttonsDotted?: boolean;

	// 是否显示分页进度条，进度由 currentPage / pageCount 计算。
	progress?: boolean;

	// 是否启用无限翻页；第一页上一页跳到最后一页，最后一页下一页跳到第一页。
	infinite?: boolean;

	// 指定禁用的页码列表；这些页码不可点击，翻页时应自动跳过。
	disabledItems?: number[];

	// 指定加载中的页码列表；这些页码显示 loading 状态，不可点击，翻页时应自动跳过。
	loadingItems?: number[];

	// 分页尺寸，用于控制按钮高度、字号、间距等。
	size?: PaginationSize;

	// 根节点自定义内联样式，支持字符串或 CSSProperties。
	customStyle?: string | CSSProperties;

	// 页码变化后的回调，适合 JSX/TSX 方式直接传入。
	onPageChange?: (page: number) => void;

	// 每页条数变化后的回调，适合 JSX/TSX 方式直接传入。
	onSizeChange?: (size: number) => void;
}

export interface PaginationEmits {
	(
		event: 'update:currentPage' | 'update:pageSize' | 'pageChange' | 'sizeChange' | 'prevClick' | 'nextClick',
		value: number,
	): void;
}

export interface PaginationState {
	currentPage: number;
	pageSize: number;
	pageCount: number;
}
