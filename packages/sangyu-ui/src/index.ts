import type { App, Plugin } from 'vue';
import pkg from '../package.json';
import * as components from './components';
import type { SangyuUIPlugin } from './Component.type';
import './style';

export * from './components';

const isPlugin = (value: unknown): value is Plugin => {
	const canHaveInstall = (typeof value === 'object' && value !== null) || typeof value === 'function';

	return canHaveInstall && 'install' in value;
};

/** 当前组件库版本 */
export const version = pkg.version;

/** Sangyu UI 完整引入插件 */
export const SangyuUI: SangyuUIPlugin = {
	install(app: App) {
		Object.values(components).forEach((component) => {
			if (isPlugin(component)) app.use(component);
		});
	},
	version,
};

export default SangyuUI;
