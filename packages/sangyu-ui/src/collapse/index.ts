import type { App } from 'vue';
import SyCollapseComponent from './SyCollapse.vue';
import { SyCollapseItem } from './components';

const SyCollapse = SyCollapseComponent as typeof SyCollapseComponent & { install: (app: App) => void };
SyCollapse.install = (app) => {
	app.component('SyCollapse', SyCollapse);
	app.component('SyCollapseItem', SyCollapseItem);
};

export { SyCollapse, SyCollapseItem };
export * from './Collapse.type';
export default SyCollapse;
