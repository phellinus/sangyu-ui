import { cloneVNode, defineComponent, Fragment, ref, type PropType, type StyleValue, type VNode } from 'vue';
import { SyArrowDown, SyArrowLeft, SyArrowRight, SyArrowUp } from '@sangyu-ui/icons';
import type {
	CarouselAnimation,
	CarouselArrowVisibility,
	CarouselDirection,
	CarouselIndicator,
	CarouselIndicatorPosition,
} from './Carousel.type';
import { SyCarouselItem } from './components/SyCarouselItem';
import { useCarousel } from './composables/useCarousel';

function flatten(children: VNode[]): VNode[] {
	return children.flatMap((child) => (child.type === Fragment ? flatten(child.children as VNode[]) : [child]));
}

/** 显示可手动控制和自动播放的轮播内容 */
export const SyCarousel = defineComponent({
	name: 'SyCarousel',
	inheritAttrs: false,
	props: {
		modelValue: { type: Number, default: undefined },
		defaultValue: { type: Number, default: 0 },
		autoplay: { type: Boolean, default: false },
		interval: { type: Number, default: 3000 },
		pauseOnHover: { type: Boolean, default: true },
		direction: { type: String as PropType<CarouselDirection>, default: 'horizontal' },
		animation: { type: String as PropType<CarouselAnimation>, default: 'slide' },
		indicator: { type: String as PropType<CarouselIndicator>, default: 'dot' },
		indicatorPosition: { type: String as PropType<CarouselIndicatorPosition>, default: 'bottom' },
		showArrow: { type: String as PropType<CarouselArrowVisibility>, default: 'always' },
		loop: { type: Boolean, default: true },
		transitionDuration: { type: Number, default: 500 },
	},
	emits: {
		'update:modelValue': (_index: number) => true,
		change: (_index: number, _previousIndex: number, _isManual: boolean) => true,
	},
	setup(props, { attrs, slots, emit }) {
		const count = ref(0);
		const state = useCarousel(props, count, emit);

		function renderSlide(node: VNode, index: number, ghost = false) {
			const active = !ghost && index === state.current.value;
			return (
				<div
					key={`${ghost ? 'ghost' : 'item'}-${index}`}
					class={['sy-carousel__slide', { 'is-active': active }]}
					inert={active ? undefined : true}
				>
					{cloneVNode(node, { key: `${ghost ? 'ghost' : 'item'}-${index}` })}
				</div>
			);
		}

		function onTrackTransitionEnd(event: TransitionEvent) {
			if (event.target === event.currentTarget && event.propertyName === 'transform') state.settle();
		}

		return () => {
			const items = flatten(slots.default?.() ?? []).filter((node) => node.type === SyCarouselItem);
			if (count.value !== items.length) count.value = items.length;
			const slides = state.hasClones.value
				? [
						renderSlide(items[count.value - 1], count.value - 1, true),
						...items.map((node, index) => renderSlide(node, index)),
						renderSlide(items[0], 0, true),
					]
				: items.map((node, index) => renderSlide(node, index));
			const offset = `${-state.visualIndex.value * 100}%`;
			const trackStyle =
				props.direction === 'vertical'
					? { transform: `translate3d(0, ${offset}, 0)` }
					: { transform: `translate3d(${offset}, 0, 0)` };
			const showControls = count.value > 1;
			return (
				<section
					{...attrs}
					class={[
						'sy-carousel',
						`sy-carousel--${props.direction}`,
						`sy-carousel--${props.animation}`,
						`sy-carousel--indicator-${props.indicatorPosition}`,
						`sy-carousel--arrow-${props.showArrow}`,
						attrs.class,
					]}
					style={[
						{
							'--sy-carousel-transition-duration': `${state.reducedMotion.value || state.suppressTransition.value ? 0 : Math.max(0, props.transitionDuration)}ms`,
						},
						attrs.style as StyleValue,
					]}
					role='region'
					aria-roledescription='轮播'
					aria-label={typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : '轮播'}
					aria-live={props.autoplay && !state.paused.value ? 'off' : 'polite'}
					onMouseenter={() => {
						state.hovered.value = true;
					}}
					onMouseleave={() => {
						state.hovered.value = false;
					}}
					onFocusin={() => {
						state.focused.value = true;
					}}
					onFocusout={(event) => {
						if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) {
							state.focused.value = false;
						}
					}}
				>
					<div class='sy-carousel__viewport'>
						<div
							class='sy-carousel__track'
							style={props.animation === 'slide' ? trackStyle : undefined}
							onTransitionend={onTrackTransitionEnd}
						>
							{slides}
						</div>
					</div>
					{showControls && props.showArrow !== 'never' && (
						<>
							<button
								class='sy-carousel__arrow sy-carousel__arrow--previous'
								type='button'
								disabled={!props.loop && state.current.value === 0}
								onClick={state.previous}
							>
								{props.direction === 'vertical' ? <SyArrowUp /> : <SyArrowLeft />}
							</button>
							<button
								class='sy-carousel__arrow sy-carousel__arrow--next'
								type='button'
								disabled={!props.loop && state.current.value === count.value - 1}
								onClick={() => state.next()}
							>
								{props.direction === 'vertical' ? <SyArrowDown /> : <SyArrowRight />}
							</button>
						</>
					)}
					{showControls && props.indicator !== 'none' && (
						<div
							class={['sy-carousel__indicators', `sy-carousel__indicators--${props.indicator}`]}
							aria-label='轮播指示器'
						>
							{items.map((_, index) => (
								<button
									key={index}
									class={['sy-carousel__indicator', { 'is-active': index === state.current.value }]}
									type='button'
									onClick={() => state.select(index)}
								/>
							))}
						</div>
					)}
					{showControls && props.autoplay && (
						<button
							class='sy-carousel__play-toggle'
							type='button'
							onClick={() => {
								state.paused.value = !state.paused.value;
							}}
						>
							{state.paused.value ? '▶' : '⏸'}
						</button>
					)}
				</section>
			);
		};
	},
});
