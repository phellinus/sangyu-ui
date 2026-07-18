import type { App } from 'vue';
import SyButton from './SyButton.vue';

(SyButton as typeof SyButton & { install(app: App): void }).install = (app: App) => {
	app.component(SyButton.name || 'SyButton', SyButton);
};

export { SyButton };
export * from './Button.type';
export default SyButton;
