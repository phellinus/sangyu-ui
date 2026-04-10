import { App } from 'vue';
import SyStep from './step';
import SySteps from './steps';

(SySteps as any).install = (app: App) => {
	app.component(SyStep.name || 'SyStep', SyStep);
	app.component(SySteps.name || 'SySteps', SySteps);
};

export { SyStep, SySteps };
export default SySteps;
