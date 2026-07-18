import type { App } from 'vue';
import SyMenu from './SyMenu';
import { SyMenuItem, SySubMenu } from './components';

(
	SyMenu as typeof SyMenu & {
		install(app: App): void;
	}
).install = (app: App) => {
	app.component('SyMenu', SyMenu);
	app.component('SyMenuItem', SyMenuItem);
	app.component('SySubMenu', SySubMenu);
};

export { SyMenu, SyMenuItem, SySubMenu };

export * from './Menu.type';

export default SyMenu;
