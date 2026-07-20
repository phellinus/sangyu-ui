import type { App, Plugin } from 'vue';
import { createNotification } from './Notification.service';
import type { NotificationService } from './Notification.type';

const notificationService = createNotification();

/**
 * 保持原有 SyNotification.info() 的调用方式
 * 同时支持通过 app.use() 安装到 globalProperties
 */
const SyNotification = Object.assign(notificationService, {
	install(app: App) {
		/**
		 * 保持原有 this.$notification(options) 调用方式。
		 */
		app.config.globalProperties.$notification = notificationService.info;
	},
}) as NotificationService & Plugin;

export { SyNotification };
export { default as SyNotificationContainer } from './SyNotification';
export { createNotification } from './Notification.service';
export * from './Notification.type';

export default SyNotification;
