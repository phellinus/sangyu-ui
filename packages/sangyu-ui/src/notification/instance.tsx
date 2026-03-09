import { createVNode, render } from 'vue';
import { NotificationConfig, NotificationInstance } from './interface';
import SyNotification from './notification';

export function createNotification() {
	let instance: NotificationInstance;
	const info = (config: NotificationConfig) => {
		if (!instance) {
			//如果实例不存在,创建一个
			const body = document.body;
			const vm = createVNode(SyNotification, {
				onReady(_instance: NotificationInstance) {
					instance = _instance;
					instance.add(config);
				},
			});
			render(vm, body);
		} else {
			instance.add(config);
		}
	};
	return {
		info,
	};
}
