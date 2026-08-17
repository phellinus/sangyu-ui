import SyCardComponent from './card.vue';
import { withInstall } from '@sangyu-ui/utils';
import type { ComponentWithInstall } from '../Component.type';

const SyCard: ComponentWithInstall<typeof SyCardComponent> = withInstall(SyCardComponent);

export { SyCard };
export * from './Card.type';
export default SyCard;
