import { Placement, useFloating, arrow, offset, flip, autoUpdate } from '@floating-ui/vue';
import { computed, createVNode, CSSProperties, defineComponent, PropType, ref, VNode } from 'vue';
import { filterEmpty, isBaseType } from '@v-c/utils';
import { getColorWithAlpha, useClassnames } from '@sangyu-ui/utils';
import { getArrowStyle } from './utils/get-arrow';
export default defineComponent({
	name: 'SyTooltip',
	props: {
		placement: {
			type: String as PropType<Placement>,
			default: 'top',
		},
		content: {
			type: String as PropType<string>,
		},
		color: {
			type: String as PropType<string>,
			default: '#2C3F51',
		},
		trigger: {
			type: String as PropType<'hover' | 'click'>,
			default: 'hover',
		},
		type: {
			type: String as PropType<'border' | 'filled' | 'border-thick'>,
			default: 'filled',
		},
		showArrow: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		arrowSize: {
			type: Number as PropType<number>,
			default: 6,
		},
		customStyle: {
			type: Object as PropType<CSSProperties>,
		},
	},
	setup(props, { slots }) {
		const reference = ref(null);
		const floating = ref(null);
		const floatingArrow = ref(null);

		const show = ref(false);
		const placement = computed(() => props.placement);

		const middleware = computed(() => {
			const list: any[] = [offset(props.showArrow ? 10 : 6), flip()];
			if (props.showArrow) list.push(arrow({ element: floatingArrow }));
			return list;
		});

		const { floatingStyles, middlewareData } = useFloating(reference, floating, {
			placement,
			strategy: 'fixed',
			whileElementsMounted: autoUpdate,
			middleware,
		});
		const { c } = useClassnames('tooltip');
		const tooltipStyle: CSSProperties = {
			'--tooltip-color': getColorWithAlpha(props.color, 1),
			'--tooltip-arrow': `${props.arrowSize}px`,
		};
		const handleMouseEnter = () => {
			if (props.trigger !== 'hover') return;
			show.value = true;
		};
		const handleClick = () => {
			if (props.trigger !== 'click') return;
			show.value = true;
		};
		let timer: ReturnType<typeof setTimeout> | undefined;
		const handleMouseLeave = () => {
			timer = setTimeout(() => {
				show.value = false;
			}, 200);
		};
		return () => {
			const renderTooltip = () => {
				if (!reference.value) return null;
				if (!show.value) return null;
				const cls = {
					[c()]: true,
					[c(props.type)]: true,
				};
				const event = {
					onMouseenter: () => {
						if (timer) clearTimeout(timer);
						timer = undefined;
					},
					onMouseleave: () => {
						show.value = false;
					},
				};
				const arrowStyle = props.showArrow
					? getArrowStyle(middlewareData as any, placement as any, props.arrowSize)
					: undefined;
				const dataPlacement = (middlewareData.value.placement ?? placement.value) as string;
				return (
					<div
						{...event}
						ref={floating}
						data-placement={dataPlacement}
						class={cls}
						style={{ ...floatingStyles.value, ...tooltipStyle, ...props.customStyle }}
					>
						{slots.content ? slots.content?.() : props.content}
						{props.showArrow ? <div ref={floatingArrow} class={c('arrow')} style={arrowStyle}></div> : null}
					</div>
				);
			};
			const children = filterEmpty(slots.default?.());
			if (children && children.length < 1) {
				return null;
			}
			if (children.length > 1) {
				console.warn('SyTooltip: only one child is allowed');
				return children;
			}
			const node = children[0];
			if (isBaseType(node)) {
				console.warn('SyTooltip: must have a child component');
				return node;
			}
			const events = {
				onMouseenter: handleMouseEnter,
				onMouseleave: handleMouseLeave,
				onClick: handleClick,
			};
			const tipNode = createVNode(node as VNode, {
				ref: reference,
				...events,
			});
			return (
				<>
					{tipNode}
					{renderTooltip()}
				</>
			);
		};
	},
});
