/** 侧栏宽度，数字按像素处理，字符串使用 CSS 长度 */
export interface LayoutSiderProps {
	width?: number | string;
}

/** 内容区默认使用 main，嵌套内容区可改用 section */
export interface LayoutContentProps {
	as?: 'main' | 'section' | 'div';
}
