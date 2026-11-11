import { computed, defineComponent, PropType } from 'vue';
import { getColor, useClassnames } from '@sangyu-ui/utils';
import { DividerProps } from './interface';

const thicknessMap: Record<DividerProps['thickness'] & string, string> = {
	thin: 'var(--sy-divider-thickness-thin, 1px)',
	medium: 'var(--sy-divider-thickness-medium, 2px)',
	thick: 'var(--sy-divider-thickness-thick, 4px)',
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
		const resolvedColor = computed(() =>
			props.color ? getColor(props.color) : 'var(--sy-divider-default-color, var(--sy-color-divider))',
		);
		const lineThickness = computed(() => thicknessMap[props.thickness] || thicknessMap.thin);
		const hasContent = computed(() => !isVertical.value && !!(slots.default?.().length || props.content));
		const rootStyle = computed(() => [
			props.customStyle,
			{
				'--sy-divider-color': resolvedColor.value,
				'--sy-divider-thickness': lineThickness.value,
				width: isVertical.value ? 'auto' : normalizeSize(props.width, '100%'),
				height: isVertical.value ? normalizeSize(props.height, '1em') : normalizeSize(props.height),
				margin:
					props.margin === undefined
						? isVertical.value
							? 'var(--sy-divider-vertical-margin, 0 10px)'
							: 'var(--sy-divider-horizontal-margin, 24px 0)'
						: normalizeSize(props.margin),
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
