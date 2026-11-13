import { withInstall } from '@sangyu-ui/utils';
import type { ComponentWithInstall } from '../Component.type';
import SySpaceComponent from './SySpace';

const SySpace: ComponentWithInstall<typeof SySpaceComponent> = withInstall(SySpaceComponent);

export { SySpace };
export type * from './Space.type';
export default SySpace;
