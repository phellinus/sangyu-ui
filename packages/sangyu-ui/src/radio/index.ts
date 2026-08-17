import type { App, Component } from 'vue';
import _SyRadio from './syradio';
import _SyRadioButton from './syradiobutton';
import _SyRadioGroup from './syradiogroup';
import type { ComponentWithInstall } from '../Component.type';

/** 为单个组件添加 app.use() 安装能力 */
function withInstall<T extends Component>(component: T): ComponentWithInstall<T> {
	const installable = component as ComponentWithInstall<T>;

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
const SyRadio: ComponentWithInstall<typeof _SyRadio> = withInstall(_SyRadio);
const SyRadioButton: ComponentWithInstall<typeof _SyRadioButton> = withInstall(_SyRadioButton);
const SyRadioGroup: ComponentWithInstall<typeof _SyRadioGroup> = withInstall(_SyRadioGroup);

/** 导出 Radio 组件 */
export { SyRadio, SyRadioButton, SyRadioGroup };

/** 导出 Radio 对外公开类型 */
export * from './Radio.type';

/** 默认导出基础 Radio */
export default SyRadio;
