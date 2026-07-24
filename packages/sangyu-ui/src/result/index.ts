import type { App } from 'vue';
import SyResult from './SyResult';

(
	SyResult as typeof SyResult & {
		install(app: App): void;
	}
).install = (app: App) => {
	app.component(SyResult.name || 'SyResult', SyResult);
};

export { SyResult };

export * from './Result.type';

export default SyResult;
