import { App } from 'vue';
import SyDivider from './divider';

(SyDivider as any).install = (app: App) => {
	app.component(SyDivider.name || 'SyDivider', SyDivider);
};

export default SyDivider;
