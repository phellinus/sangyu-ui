import { App } from 'vue';
import SyRadio from './syradio';
import SyRadioButton from './syradiobutton';

(SyRadio as any).install = (app: App) => {
	app.component(SyRadio.name || 'SyRadio', SyRadio);
	app.component(SyRadioButton.name || 'SyRadioButton', SyRadioButton);
};
export { SyRadio, SyRadioButton };
export default SyRadio;
