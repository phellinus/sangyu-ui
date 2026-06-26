import { App } from 'vue';
import SySwitch from './SySwitch.vue';

(SySwitch as any).install = (app: App) => {
	app.component(SySwitch.name || 'SySwitch', SySwitch);
};

export { SySwitch };
export * from './Switch.type';
export default SySwitch;
