import { onBeforeUnmount, shallowRef } from 'vue';
import { DEFAULT_NOTIFICATION_CLAMP, DEFAULT_NOTIFICATION_DURATION, DEFAULT_NOTIFICATION_POSITION } from '../constants';
import type {
	NotificationManager,
	NotificationOptions,
	NotificationPosition,
	NotificationRecord,
} from '../Notification.type';

let notificationSeed = 0;

/**
 * 管理 Notification 的数据、计时器和关闭行为。
 */
export function useNotification(): NotificationManager & {
	notifications: ReturnType<typeof shallowRef<NotificationRecord[]>>;
	getByPosition: (position: NotificationPosition) => NotificationRecord[];
} {
	/**
	 * 使用 shallowRef，避免 Vue 对传入的 VNode 内容进行不必要的深层响应式处理
	 */
	const notifications = shallowRef<NotificationRecord[]>([]);

	/** 获取合法的自动关闭时间 */
	const normalizeDuration = (options: NotificationOptions): number => {
		const value = options.duration ?? DEFAULT_NOTIFICATION_DURATION;

		if (!Number.isFinite(value)) {
			return DEFAULT_NOTIFICATION_DURATION;
		}

		return Math.max(0, value);
	};

	/** 移除指定通知 */
	const remove = (id: string, action = false) => {
		const target = notifications.value.find((item) => item.id === id);

		if (!target) return;

		if (target.timer) {
			clearTimeout(target.timer);
		}

		notifications.value = notifications.value.filter((item) => item.id !== id);

		/**
		 * 保持旧组件行为：只有点击关闭按钮时才调用 onClose
		 */
		if (action) {
			target.onClose?.();
		}
	};

	/** 添加一条新通知 */
	const add = (options: NotificationOptions) => {
		const duration = normalizeDuration(options);

		const notification: NotificationRecord = {
			id: `sy-notification-${Date.now()}-${++notificationSeed}`,
			title: options.title,
			content: options.content,
			type: options.type,
			onClose: options.onClose,
			duration,
			position: options.position ?? DEFAULT_NOTIFICATION_POSITION,
			showClose: options.showClose ?? true,
			clamp: Math.max(1, Math.trunc(options.clamp ?? DEFAULT_NOTIFICATION_CLAMP)),
		};

		notifications.value = [...notifications.value, notification];

		/** duration 为 0 时表示常驻，不创建计时器 */
		if (duration > 0) {
			notification.timer = setTimeout(() => {
				remove(notification.id);
			}, duration);
		}

		/**
		 * 返回单条通知的关闭函数
		 * 调用此函数属于程序关闭，因此不触发 onClose
		 */
		return () => remove(notification.id);
	};

	/** 清空所有通知以及对应计时器 */
	const clear = () => {
		notifications.value.forEach((item) => {
			if (item.timer) {
				clearTimeout(item.timer);
			}
		});

		notifications.value = [];
	};

	/** 获取指定位置的通知列表 */
	const getByPosition = (position: NotificationPosition): NotificationRecord[] => {
		return notifications.value.filter((item) => item.position === position);
	};

	/** 容器被卸载时释放所有计时器，避免产生内存泄漏 */
	onBeforeUnmount(clear);

	return {
		notifications,
		getByPosition,
		add,
		remove,
		clear,
	};
}
