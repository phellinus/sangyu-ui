import type { App } from 'vue';
import SyCard from './card.vue';

SyCard.install = (app: App) => {
	app.component(SyCard.name || 'SyCard', SyCard);
};

export default SyCard;
