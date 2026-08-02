import { withInstall } from '@sangyu-ui/utils';
import SyFormComponent from './SyForm';
import SyFormItem from './SyFormItem';

/** 带有插件安装能力的 Form 组件 */
const SyForm = withInstall(SyFormComponent, [SyFormItem]);

export { SyForm, SyFormItem };
export * from './Form.type';
export default SyForm;
