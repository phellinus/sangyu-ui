import { App } from 'vue';
import SyRadio from './syradio';

(SyRadio as any).install = (app: App) => {
	app.component(SyRadio.name || 'SyRadio', SyRadio);
};

export default SyRadio;
