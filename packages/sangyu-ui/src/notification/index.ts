import { App } from 'vue';
import SyNotification from './notification';

SyNotification.install = (app: App) => {
	app.component(SyNotification.name, SyNotification);
};

export default SyNotification;
