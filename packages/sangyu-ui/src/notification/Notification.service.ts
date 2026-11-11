import { createVNode, getCurrentInstance, render, type VNode } from 'vue';
import SyNotificationContainer from './SyNotification';
import type { NotificationManager, NotificationOptions, NotificationService } from './Notification.type';
import { themeContextKey, type ThemeContext } from '../theme/context';

/**
 * 创建一个独立的 Notification 服务
 * 默认导出使用单例；测试和微前端场景也可以单独创建
 */
export function createNotification(): NotificationService {
	let manager: NotificationManager | undefined;
	let container: HTMLDivElement | undefined;
	let rootVNode: VNode | undefined;

	/** 挂载 Notification 容器 */
	const mountContainer = (options: NotificationOptions, theme?: ThemeContext) => {
		/**
		 * Notification 属于函数式组件，不能直接 render 到 body
		 * 单独创建容器可以避免 Vue 接管或覆盖 body 中的其他内容
		 */
		container = document.createElement('div');
		container.className = 'sy-notification-host';
		document.body.appendChild(container);

		rootVNode = createVNode(SyNotificationContainer, {
			theme,
			onReady(instance: NotificationManager) {
				manager = instance;
			},
		});

		/**
		 * 当通知内容中包含业务组件时，
		 * 需要继承调用方应用的 provide、全局组件和插件上下文
		 */
		if (options.appContext) {
			rootVNode.appContext = options.appContext;
		}

		render(rootVNode, container);
	};

	/** 创建一条通知 */
	const info = (options: NotificationOptions) => {
		/**
		 * SSR 环境下不存在 document
		 * 这里返回空关闭函数，避免服务端渲染直接报错
		 */
		if (typeof document === 'undefined') {
			return () => undefined;
		}

		const caller = getCurrentInstance();
		const instanceProvides = (caller as unknown as { provides?: Record<PropertyKey, unknown> } | null)?.provides;
		const theme = instanceProvides?.[themeContextKey] ?? options.appContext?.provides[themeContextKey];
		if (!manager) {
			mountContainer(options, theme as ThemeContext | undefined);
		}

		return manager?.add(options, theme as ThemeContext | undefined) ?? (() => undefined);
	};

	/** 销毁整个 Notification 服务 */
	const destroy = () => {
		manager?.clear();

		if (container) {
			render(null, container);
			container.remove();
		}

		manager = undefined;
		container = undefined;
		rootVNode = undefined;
	};

	return {
		info,
		destroy,
	};
}
