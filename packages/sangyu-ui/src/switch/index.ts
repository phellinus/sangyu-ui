import SySwitchComponent from './SySwitch.vue';
import { withInstall } from '@sangyu-ui/utils';

const SySwitch = withInstall(SySwitchComponent);

export { SySwitch };
export * from './Switch.type';
export default SySwitch;
