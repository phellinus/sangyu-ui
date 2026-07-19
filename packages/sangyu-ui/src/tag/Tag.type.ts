import type { CSSProperties, VNodeChild } from 'vue';

/** 标签尺寸 */
export type TagSize = 'small' | 'default' | 'large';

/**
 * 标签主题
 *
 * 除了内置主题名，也允许传入其他 CSS 颜色
 * 例如：type="#8c6d4b"
 */
export type TagType = string;

/**
 * 标签组件属性
 */
export interface TagProps {
	/**
	 * 标签主题色
	 * 支持 primary、success、warning、error
	 * 或任意合法 CSS 颜色
	 */
	type?: TagType;

	/**
	 * 标签文字颜色
	 * 传入后优先级高于 type
	 */
	color?: string;

	/**
	 * 标签背景颜色
	 * 传入后优先级高于根据 type 生成的浅色背景
	 */
	bgColor?: string;

	/** 是否显示描边 */
	hit?: boolean;

	/** 标签尺寸 */
	size?: TagSize;

	/**
	 * 标签圆角
	 * number 类型自动添加 px
	 * string 类型保留原单位，例如 1rem、50%
	 */
	borderRadius?: number | string;

	/**
	 * 是否显示关闭按钮
	 */
	closable?: boolean;

	/**
	 * 是否允许点击标签
	 * 开启后会增加按钮语义和键盘交互
	 */
	clickable?: boolean;

	/** 关闭按钮的无障碍描述 */
	closeAriaLabel?: string;

	/** 根节点自定义样式 */
	customStyle?: string | CSSProperties;
}

/** 标签组件事件 */
export interface TagEmits {
	/** 鼠标或键盘触发标签点击 */
	(event: 'click', nativeEvent: MouseEvent | KeyboardEvent): void;

	/** 点击关闭按钮 */
	(event: 'close', nativeEvent: MouseEvent): void;
}

/** 标签组件插槽 */
export interface TagSlots {
	/** 标签内容 */
	default?: () => VNodeChild;

	/** 自定义关闭图标 */
	'close-icon'?: () => VNodeChild;
}
