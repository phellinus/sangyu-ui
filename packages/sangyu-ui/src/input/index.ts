import { App } from 'vue';
import SyInput from './input.vue';
SyInput.install = (app: App) => {
	app.component(SyInput.name || 'SyInput', SyInput);
};
export default SyInput;
