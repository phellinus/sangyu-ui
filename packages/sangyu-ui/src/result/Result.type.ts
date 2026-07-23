import type { CSSProperties, VNodeChild } from 'vue';

/** Result 支持的普通状态 */
export type ResultNormalStatus = 'success' | 'error' | 'info' | 'warning';
/** Result 支持的异常状态 */
export type ResultExceptionStatus = '403' | '404' | '500';
/** Result 支持的所有状态 */
export type ResultStatus = ResultNormalStatus | ResultExceptionStatus;
/** Result 布局类型 */
export type ResultLayout = 'default' | 'compact';
/** Result 组件属性 */
export interface ResultProps {
	/**
	 * 当前结果状态
	 * @default 'info'
	 */
	status?: ResultStatus;

	/**
	 * 结果标题
	 * 未传入时根据 status 显示默认标题
	 */
	title?: string;

	/** 结果副标题 */
	subTitle?: string;

	/**
	 * 自定义图标名称
	 * icon 插槽的优先级高于该属性
	 */
	icon?: string;

	/**
	 * Result 布局类型
	 * @default 'default'
	 */
	layout?: ResultLayout;

	/** Result 根节点自定义样式 */
	customStyle?: string | CSSProperties;
}

/** Result 插槽类型 */
export interface ResultSlots {
	/** 自定义状态图标或插画 */
	icon?: () => VNodeChild;

	/** 自定义标题 */
	title?: () => VNodeChild;

	/** 自定义副标题 */
	subTitle?: () => VNodeChild;

	/** 自定义补充内容 */
	default?: () => VNodeChild;

	/** 自定义操作区域 */
	extra?: () => VNodeChild;
}
