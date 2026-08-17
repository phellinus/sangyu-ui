import SyCheckboxComponent from './SyCheckbox';
import SyCheckboxGroup from './SyCheckboxGroup';
import { withInstall } from '@sangyu-ui/utils';
import type { ComponentWithInstall } from '../Component.type';

const SyCheckbox: ComponentWithInstall<typeof SyCheckboxComponent> = withInstall(SyCheckboxComponent, [
	SyCheckboxGroup,
]);

export { SyCheckbox, SyCheckboxGroup };
export * from './Checkbox.types';
export default SyCheckbox;
