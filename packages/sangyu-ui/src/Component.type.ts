import type { App, Component } from 'vue';

/** 带有 Vue 插件安装能力的组件类型 */
export type ComponentWithInstall<T extends Component> = T & {
	install: (app: App) => void;
};
