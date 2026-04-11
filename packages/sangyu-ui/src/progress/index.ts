import { App } from 'vue';
import SyProgress from './syprogress.vue';

(SyProgress as any).install = function (app: App) {
	app.component(SyProgress.name || 'SyProgress', SyProgress);
};

export default SyProgress;
