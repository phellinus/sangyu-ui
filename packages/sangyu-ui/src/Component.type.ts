import type { App, Component, Plugin } from 'vue';

/** 带有 Vue 插件安装能力的组件类型 */
export type ComponentWithInstall<T extends Component> = T & {
	install: (app: App) => void;
};

/** Sangyu UI 完整引入插件类型 */
export type SangyuUIPlugin = Plugin & {
	version: string;
};
