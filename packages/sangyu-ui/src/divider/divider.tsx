import { computed, defineComponent, PropType } from 'vue';
import { getColor, useClassnames } from '@sangyu-ui/utils';
import { DividerProps } from './interface';

const thicknessMap = {
	thin: 1,
	medium: 2,
	thick: 4,
};

const normalizeSize = (value?: string | number, fallback?: string) => {
	if (value === undefined || value === null || value === '') {
		return fallback;
	}

	return typeof value === 'number' ? `${value}px` : value;
};

export default defineComponent({
	name: 'SyDivider',
	props: {
		direction: {
			type: String as PropType<DividerProps['direction']>,
			default: 'horizontal',
		},
		align: {
			type: String as PropType<DividerProps['align']>,
			default: 'center',
		},
		variant: {
			type: String as PropType<DividerProps['variant']>,
			default: 'solid',
		},
		thickness: {
			type: String as PropType<DividerProps['thickness']>,
			default: 'thin',
		},
		content: {
			type: String,
			default: '',
		},
		color: {
			type: String,
			default: '',
		},
		width: {
			type: [String, Number] as PropType<DividerProps['width']>,
			default: undefined,
		},
		height: {
			type: [String, Number] as PropType<DividerProps['height']>,
			default: undefined,
		},
		margin: {
			type: [String, Number] as PropType<DividerProps['margin']>,
			default: undefined,
		},
		customStyle: {
			type: String,
			default: '',
		},
	},
	setup(props, { slots }) {
		const { c } = useClassnames('divider');
		const isVertical = computed(() => props.direction === 'vertical');
		const resolvedColor = computed(() => getColor(props.color) || '#d7dde5');
		const lineThickness = computed(() => thicknessMap[props.thickness] || thicknessMap.thin);
		const hasContent = computed(() => !isVertical.value && !!(slots.default?.().length || props.content));
		const rootStyle = computed(() => [
			props.customStyle,
			{
				'--sy-divider-color': resolvedColor.value,
				'--sy-divider-thickness': `${lineThickness.value}px`,
				width: isVertical.value ? 'auto' : normalizeSize(props.width, '100%'),
				height: isVertical.value ? normalizeSize(props.height, '1em') : normalizeSize(props.height),
				margin: normalizeSize(props.margin, isVertical.value ? '0 10px' : '24px 0'),
			},
		]);
		const getDividerCls = () => ({
			[c()]: true,
			[c(props.direction)]: true,
			[c(props.variant)]: true,
			[c(props.thickness)]: true,
			[c(props.align)]: hasContent.value,
			[c('with-content')]: hasContent.value,
		});
		const getLineCls = (position?: 'start' | 'end' | 'full') => ({
			[c('line')]: true,
			[c(`line-${position}`)]: !!position,
		});

		return () => {
			const contentNode = slots.default?.() ?? props.content;

			if (isVertical.value) {
				return (
					<div
						class={getDividerCls()}
						style={rootStyle.value}
						role='separator'
						aria-orientation='vertical'
					></div>
				);
			}

			if (!hasContent.value) {
				return (
					<div class={getDividerCls()} style={rootStyle.value} role='separator' aria-orientation='horizontal'>
						<span class={getLineCls('full')}></span>
					</div>
				);
			}

			return (
				<div class={getDividerCls()} style={rootStyle.value} role='separator' aria-orientation='horizontal'>
					<span class={getLineCls('start')}></span>
					<span class={c('content')}>{contentNode}</span>
					<span class={getLineCls('end')}></span>
				</div>
			);
		};
	},
});
