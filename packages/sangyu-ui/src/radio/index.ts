import type { App, Component, Plugin } from 'vue';
import _SyRadio from './SyRadio';
import _SyRadioButton from './SyRadioButton';
import _SyRadioGroup from './SyRadioGroup';

/** 为单个组件添加 app.use() 安装能力 */
function withInstall<T extends Component>(component: T): T & Plugin {
	const installable = component as T & Plugin;

	installable.install = (app: App) => {
		/**
		 * 组件必须声明 name
		 * 当前三个 Radio 组件都已经提供固定名称
		 */
		if (component.name) {
			app.component(component.name, component);
		}
	};

	return installable;
}

/** 分别为三个公开组件添加安装方法 */
const SyRadio = withInstall(_SyRadio);
const SyRadioButton = withInstall(_SyRadioButton);
const SyRadioGroup = withInstall(_SyRadioGroup);

/** 导出 Radio 组件 */
export { SyRadio, SyRadioButton, SyRadioGroup };

/** 导出 Radio 对外公开类型 */
export * from './Radio.type';

/** 默认导出基础 Radio */
export default SyRadio;
