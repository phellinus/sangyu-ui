import SySelectComponent from './SySelect';
import { withInstall } from '@sangyu-ui/utils';
import type { ComponentWithInstall } from '../Component.type';

const SySelect: ComponentWithInstall<typeof SySelectComponent> = withInstall(SySelectComponent);

export { SySelect };
export * from './Select.type';
export default SySelect;
