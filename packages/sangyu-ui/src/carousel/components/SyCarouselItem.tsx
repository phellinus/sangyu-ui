import '../style/index.less';
import { defineComponent } from 'vue';

/** 轮播中的单个内容项 */
export const SyCarouselItem = defineComponent({
	name: 'SyCarouselItem',
	setup(_, { slots }) {
		return () => <div class='sy-carousel__item'>{slots.default?.()}</div>;
	},
});
