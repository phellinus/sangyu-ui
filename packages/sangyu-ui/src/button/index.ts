import SyButtonComponent from './SyButton.vue';
import { withInstall } from '@sangyu-ui/utils';

const SyButton = withInstall(SyButtonComponent);

export { SyButton };
export * from './Button.type';
export default SyButton;
