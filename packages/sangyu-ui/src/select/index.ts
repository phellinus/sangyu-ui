import type { App } from 'vue';
import SySelect from './SySelect';

(SySelect as any).install = (app: App) => {
	app.component(SySelect.name || 'SySelect', SySelect);
};

export { SySelect };
export * from './Select.type';
export default SySelect;
