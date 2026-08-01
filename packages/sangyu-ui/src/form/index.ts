import type { App } from 'vue';
import SyFormComponent from './SyForm';
import SyFormItem from './SyFormItem';

/** 支持 Vue 插件安装的 Form 组件类型 */
type SyFormWithInstall = typeof SyFormComponent & {
	install: (app: App) => void;
};

/** 添加插件安装能力后的 SyForm 组件 */
const SyForm = SyFormComponent as SyFormWithInstall;

/**
 * 将 Form 相关组件注册为全局组件。
 */
function install(app: App): void {
	app.component(SyForm.name || 'SyForm', SyForm);
	app.component(SyFormItem.name || 'SyFormItem', SyFormItem);
}

// 为 SyForm 添加 Vue 插件安装方法
SyForm.install = install;

// 导出 Form 和 FormItem 组件
export { SyForm, SyFormItem };

// 导出 Form 组件相关的公开类型
export * from './Form.type';

// 默认导出带有 install 方法的 SyForm
export default SyForm;
