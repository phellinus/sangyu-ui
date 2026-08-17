import { withInstall } from '@sangyu-ui/utils';
import SyDrawerComponent from './SyDrawer';
import type { ComponentWithInstall } from '../Component.type';

const SyDrawer: ComponentWithInstall<typeof SyDrawerComponent> = withInstall(SyDrawerComponent);

export { SyDrawer };
export * from './Drawer.type';
export default SyDrawer;
