import { App } from 'vue';
import SyStep from './step';
import SySteps from './steps';

(SyStep as any).install = (app: App) => {
	app.component(SyStep.name, SyStep);
	app.component(SySteps.name, SySteps);
};

export default SyStep;
