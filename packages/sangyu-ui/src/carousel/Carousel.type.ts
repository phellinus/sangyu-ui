export type CarouselDirection = 'horizontal' | 'vertical';
export type CarouselAnimation = 'slide' | 'fade';
export type CarouselIndicator = 'dot' | 'line' | 'none';
export type CarouselIndicatorPosition = 'top' | 'bottom' | 'left' | 'right';
export type CarouselArrowVisibility = 'always' | 'hover' | 'never';

/**
 * 轮播索引从零开始，受控值由父组件负责回传
 */
export interface CarouselProps {
	modelValue?: number;
	defaultValue?: number;
	autoplay?: boolean;
	interval?: number;
	pauseOnHover?: boolean;
	direction?: CarouselDirection;
	animation?: CarouselAnimation;
	indicator?: CarouselIndicator;
	indicatorPosition?: CarouselIndicatorPosition;
	showArrow?: CarouselArrowVisibility;
	loop?: boolean;
	transitionDuration?: number;
}
