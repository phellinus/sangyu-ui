import type { App } from 'vue';
import { createNotification } from './instance';

const instance = createNotification();

(instance as any).install = (app: App) => {
	app.config.globalProperties.$notification = instance.info;
};

export default instance;
