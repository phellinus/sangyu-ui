import type { App } from 'vue';
import { SyTabs } from './SyTabs';
import { SyTabPane } from './SyTabPane';

const Tabs = SyTabs as typeof SyTabs & { install: (app: App) => void };
Tabs.install = (app: App) => {
	app.component('SyTabs', Tabs);
	app.component('SyTabPane', SyTabPane);
};

export { Tabs as SyTabs, SyTabPane };
export type * from './Tabs.type';
export default Tabs;
