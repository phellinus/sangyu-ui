import { App } from 'vue';
import SyResult from './result';

(SyResult as any).install = (app: App) => {
	app.component(SyResult.name, SyResult);
};

export default SyResult;
