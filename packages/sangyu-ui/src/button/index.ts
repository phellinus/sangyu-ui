import SyButtonComponent from './SyButton.vue';
import { withInstall } from '@sangyu-ui/utils';
import type { ComponentWithInstall } from '../Component.type';

const SyButton: ComponentWithInstall<typeof SyButtonComponent> = withInstall(SyButtonComponent);

export { SyButton };
export * from './Button.type';
export default SyButton;
