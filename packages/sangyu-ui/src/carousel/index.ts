import type { App } from 'vue';
import { SyCarousel as CarouselComponent } from './SyCarousel';
import { SyCarouselItem } from './components/SyCarouselItem';

const SyCarousel = CarouselComponent as typeof CarouselComponent & { install: (app: App) => void };
SyCarousel.install = (app: App) => {
	app.component('SyCarousel', SyCarousel);
	app.component('SyCarouselItem', SyCarouselItem);
};

export { SyCarousel, SyCarouselItem };
export type * from './Carousel.type';
export default SyCarousel;
