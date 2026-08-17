import SySwitchComponent from './SySwitch.vue';
import { withInstall } from '@sangyu-ui/utils';
import type { ComponentWithInstall } from '../Component.type';

const SySwitch: ComponentWithInstall<typeof SySwitchComponent> = withInstall(SySwitchComponent);

export { SySwitch };
export * from './Switch.type';
export default SySwitch;
