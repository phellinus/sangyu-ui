import type { App } from 'vue';
import SyTooltip from './tooltip';

SyTooltip.install = (app: App) => {
	app.component(SyTooltip.name, SyTooltip);
};

export default SyTooltip;
