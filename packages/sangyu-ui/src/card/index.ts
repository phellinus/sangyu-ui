import SyCardComponent from './card.vue';
import { withInstall } from '@sangyu-ui/utils';

const SyCard = withInstall(SyCardComponent);

export { SyCard };
export * from './Card.type';
export default SyCard;
