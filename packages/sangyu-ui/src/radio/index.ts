import { App } from 'vue';
import SyRadio from './syradio';
import SyRadioButton from './syradiobutton';
import SyRadioGroup from './syradiogroup';

(SyRadio as any).install = (app: App) => {
	app.component(SyRadio.name || 'SyRadio', SyRadio);
	app.component(SyRadioButton.name || 'SyRadioButton', SyRadioButton);
	app.component(SyRadioGroup.name || 'SyRadioGroup', SyRadioGroup);
};
export { SyRadio, SyRadioButton, SyRadioGroup };
export default SyRadio;
