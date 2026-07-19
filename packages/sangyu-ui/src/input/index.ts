import type { App } from 'vue';
import SyInput from './SyInput.vue';

(SyInput as any).install = (app: App) => {
	app.component(SyInput.name || 'SyInput', SyInput);
};

export { SyInput };
export * from './Input.type';
export default SyInput;
