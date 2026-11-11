import { computed, defineComponent, type CSSProperties, type PropType, type Ref } from 'vue';
import { getColorWithAlpha, useClassnames } from '@sangyu-ui/utils';
import type { TooltipType } from '../Tooltip.type';
import { DEFAULT_TOOLTIP_ARROW_SIZE, DEFAULT_TOOLTIP_COLOR, DEFAULT_TOOLTIP_TYPE } from '../constants';

// 单独负责渲染 Tooltip 浮层内容
export default defineComponent({
	name: 'TooltipContent',
	props: {
		content: String,
		color: {
			type: String,
			default: undefined,
		},
		type: {
			type: String as PropType<TooltipType>,
			default: DEFAULT_TOOLTIP_TYPE,
		},
		showArrow: {
			type: Boolean,
			default: true,
		},
		arrowSize: {
			type: Number,
			default: DEFAULT_TOOLTIP_ARROW_SIZE,
		},
		placement: {
			type: String,
			required: true,
		},
		floatingRef: {
			type: Object as PropType<Ref<HTMLElement | null>>,
			required: true,
		},
		arrowRef: {
			type: Object as PropType<Ref<HTMLElement | null>>,
			required: true,
		},
		floatingStyle: {
			type: Object as PropType<CSSProperties>,
			required: true,
		},
		arrowStyle: {
			type: Object as PropType<CSSProperties>,
		},
		customStyle: {
			type: Object as PropType<CSSProperties>,
		},
	},
	setup(props, { slots }) {
		const { c } = useClassnames('tooltip');

		const classes = computed(() => ({
			[c()]: true,
			[c(props.type)]: true,
		}));

		const styles = computed(() => [
			props.floatingStyle,
			{
				'--tooltip-color': props.color
					? getColorWithAlpha(props.color, 1)
					: `var(--sy-tooltip-background, ${DEFAULT_TOOLTIP_COLOR})`,
				'--tooltip-text-color': 'var(--sy-tooltip-text-color, #fff)',
				'--tooltip-border-color': props.color
					? 'var(--tooltip-color)'
					: 'var(--sy-tooltip-border-color, var(--tooltip-color))',
				'--tooltip-border-background': 'var(--sy-tooltip-border-background, var(--sy-color-surface, #fff))',
				'--tooltip-arrow': `${props.arrowSize}px`,
			},
			props.customStyle,
		]);

		return () => {
			const slotContent = slots.default?.();

			return (
				<div
					ref={props.floatingRef}
					class={classes.value}
					style={styles.value}
					data-placement={props.placement}
					role='tooltip'
				>
					{slotContent && slotContent.length > 0 ? slotContent : props.content}
					{props.showArrow && <div ref={props.arrowRef} class={c('arrow')} style={props.arrowStyle} />}
				</div>
			);
		};
	},
});
