import { App } from 'vue';
import SyVerify from './SyVerify.vue';

(SyVerify as any).install = (app: App) => {
	app.component(SyVerify.name || 'SyVerify', SyVerify);
};

export { SyVerify };
export * from './Verify.type';
export default SyVerify;
