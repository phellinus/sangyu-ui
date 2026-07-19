import type { App } from 'vue';
import SyTag from './tag.vue';

SyTag.install = (app: App) => {
	app.component(SyTag.name || 'SyTag', SyTag);
};
export { SyTag };
export * from './Tag.type';
export default SyTag;
