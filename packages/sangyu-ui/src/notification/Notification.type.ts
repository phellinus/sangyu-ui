import type { AppContext, VNodeChild } from 'vue';

/** Notification 支持的通知类型 */
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

/** Notification 支持的弹出位置 */
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/** 创建通知时传入的配置 */
export interface NotificationOptions {
	/** 通知标题 */
	title: VNodeChild;

	/** 通知正文 */
	content: VNodeChild;

	/** 通知类型，不传时不显示状态图标 */
	type?: NotificationType;

	/**
	 * 自动关闭时间，单位为毫秒
	 * 设置为 0 时不自动关闭
	 * @default 3000
	 */
	duration?: number;

	/**
	 * 是否显示关闭按钮
	 * @default true
	 */
	showClose?: boolean;

	/**
	 * 正文最多显示的行数。
	 * @default 3
	 */
	clamp?: number;

	/**
	 * 通知弹出位置。
	 * @default 'top-right'
	 */
	position?: NotificationPosition;

	/**
	 * 用户点击关闭按钮时触发
	 * 为了兼容旧行为，自动关闭和调用关闭函数时不会触发
	 */
	onClose?: () => void;

	/**
	 * 使用 h() 渲染业务组件时，可以传入当前 Vue 应用上下文
	 */
	appContext?: AppContext;
}

/** Notification 内部保存的标准化数据 */
export interface NotificationRecord
	extends Omit<NotificationOptions, 'duration' | 'appContext' | 'position' | 'showClose' | 'clamp'> {
	/** Notification 内部唯一标识 */
	id: string;

	/** 标准化后的显示时间 */
	duration: number;

	/** 标准化后的弹出位置 */
	position: NotificationPosition;

	/** 标准化后的关闭按钮状态 */
	showClose: boolean;

	/** 标准化后的正文行数 */
	clamp: number;

	/** 自动关闭计时器 */
	timer?: ReturnType<typeof setTimeout>;
}

/** 创建通知后返回的关闭函数 */
export type NotificationCloseHandler = () => void;

/** Notification 容器暴露给服务层的方法 */
export interface NotificationManager {
	add: (options: NotificationOptions) => NotificationCloseHandler;

	/**
	 * 关闭指定通知
	 * action 为 true 时表示用户主动点击关闭按钮
	 */
	remove: (id: string, action?: boolean) => void;

	/** 清空所有通知 */
	clear: () => void;
}

/** 对外暴露的 Notification 服务 */
export interface NotificationService {
	/** 创建一条通知 */
	info: (options: NotificationOptions) => NotificationCloseHandler;

	/**
	 * 卸载 Notification 容器
	 * 主要用于测试、微前端卸载或应用销毁场景
	 */
	destroy: () => void;
}
