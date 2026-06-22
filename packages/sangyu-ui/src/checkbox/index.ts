import { App } from 'vue';
import SyCheckbox from './SyCheckbox';
import SyCheckboxGroup from './SyCheckboxGroup';
(SyCheckbox as any).install = (app: App) => {
	app.component(SyCheckbox.name || 'SyCheckbox', SyCheckbox);
	app.component(SyCheckboxGroup.name || 'SyCheckboxGroup', SyCheckboxGroup);
};
export { SyCheckbox, SyCheckboxGroup };
export * from './Checkbox.types';
export default SyCheckbox;
