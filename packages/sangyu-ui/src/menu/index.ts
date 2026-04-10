import { App } from 'vue';
import SyMenu from './menu';
import SyMenuItem from './menuitem';
import SySubMenu from './submenu';

(SyMenu as any).install = (app: App) => {
	app.component(SyMenu.name || 'SyMenu', SyMenu);
	app.component(SyMenuItem.name, SyMenuItem);
	app.component(SySubMenu.name, SySubMenu);
};

export default SyMenu;
