import SyCheckboxComponent from './SyCheckbox';
import SyCheckboxGroup from './SyCheckboxGroup';
import { withInstall } from '@sangyu-ui/utils';

const SyCheckbox = withInstall(SyCheckboxComponent, [SyCheckboxGroup]);

export { SyCheckbox, SyCheckboxGroup };
export * from './Checkbox.types';
export default SyCheckbox;
