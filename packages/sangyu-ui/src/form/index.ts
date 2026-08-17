import { withInstall } from '@sangyu-ui/utils';
import SyFormComponent from './SyForm';
import SyFormItem from './SyFormItem';
import type { ComponentWithInstall } from '../Component.type';

/** 带有插件安装能力的 Form 组件 */
const SyForm: ComponentWithInstall<typeof SyFormComponent> = withInstall(SyFormComponent, [SyFormItem]);

export { SyForm, SyFormItem };
export * from './Form.type';
export default SyForm;
