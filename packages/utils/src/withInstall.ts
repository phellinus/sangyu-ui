import type { App, Component } from 'vue';

/** 带有 Vue 插件安装方法的组件类型 */
type ComponentWithInstall<T extends Component> = T & {
	// 将组件注册到 Vue 应用
	install: (app: App) => void;
};

/**
 * 为组件添加 Vue 插件安装能力
 *
 * @param component 作为插件入口的主组件
 * @param extraComponents 需要同时注册的关联组件
 * @returns 带有 install 方法的组件
 */
export function withInstall<T extends Component>(
	component: T,
	extraComponents: Component[] = [],
): T & { install: (app: App) => void } {
	const target = component as ComponentWithInstall<T>;

	/**
	 * 将主组件和关联组件注册到 Vue 应用
	 * @param app Vue 应用实例
	 */
	target.install = (app: App): void => {
		const components = [component, ...extraComponents];

		components.forEach((item) => {
			const name = item.name;

			if (name) {
				app.component(name, item);
			}
		});
	};

	return target;
}
