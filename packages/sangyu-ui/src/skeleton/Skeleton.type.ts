/**
 * 骨架屏的加载和动效设置
 */
export interface SkeletonProps {
	/** 是否显示加载占位 */
	loading?: boolean;
	/** 是否启用占位动效 */
	animation?: boolean;
}

/**
 * 骨架屏的占位和正文插槽
 */
export interface SkeletonSlots {
	/** 加载中渲染的装饰性占位 */
	default?: () => unknown;
	/** 加载结束后渲染的正文 */
	content?: () => unknown;
}

/**
 * 线型骨架的行数和尺寸设置
 */
export interface SkeletonLineProps {
	/** 要渲染的非负整数行数 */
	rows?: number;
	/** 按行提供宽度，数字以 px 计，字符串使用 CSS 宽度 */
	widths?: readonly (number | string)[];
	/** 行高，单位为 px */
	lineHeight?: number;
	/** 行距，单位为 px */
	lineSpacing?: number;
}

/**
 * 图形骨架的形状和尺寸设置
 */
export interface SkeletonShapeProps {
	/** 占位图形 */
	shape?: 'square' | 'circle';
	/** 占位尺寸 */
	size?: 'small' | 'medium' | 'large';
}
