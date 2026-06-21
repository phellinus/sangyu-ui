import { App } from 'vue';
import SyCheckbox from './SyCheckbox';
(SyCheckbox as any).install = (app: App) => {
	app.component(SyCheckbox.name || 'SyCheckbox', SyCheckbox);
};
export { SyCheckbox };
export * from './Checkbox.types';
export default SyCheckbox;
