import { cloneVNode, computed, defineComponent, getCurrentInstance, type PropType } from 'vue';
import type { Placement } from '@floating-ui/vue';
import { TooltipContent } from './components';
import { useTooltipFloating, useTooltipVisible } from './composables';
import {
	DEFAULT_TOOLTIP_ARROW_SIZE,
	DEFAULT_TOOLTIP_COLOR,
	DEFAULT_TOOLTIP_PLACEMENT,
	DEFAULT_TOOLTIP_TRIGGER,
	DEFAULT_TOOLTIP_TYPE,
} from './constants';
import { getArrowStyle, getTriggerNode } from './helpers';
import type { TooltipTrigger, TooltipType } from './Tooltip.type';
import type { TooltipProps } from './Tooltip.type';
import { useTheme } from '../theme/context';

// Tooltip 入口组件负责组合触发器 交互状态和浮层内容
export default defineComponent({
	name: 'SyTooltip',
	props: {
		placement: {
			type: String as PropType<Placement>,
			default: DEFAULT_TOOLTIP_PLACEMENT,
		},
		content: String,
		color: {
			type: String,
			default: DEFAULT_TOOLTIP_COLOR,
		},
		trigger: {
			type: String as PropType<TooltipTrigger>,
			default: DEFAULT_TOOLTIP_TRIGGER,
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
		customStyle: Object,
	},
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const hasColorOverride = computed(() => {
			void props.color;
			return Object.prototype.hasOwnProperty.call(instance?.vnode.props ?? {}, 'color');
		});
		const hasArrowSizeOverride = computed(() => {
			void props.arrowSize;
			return Object.prototype.hasOwnProperty.call(instance?.vnode.props ?? {}, 'arrowSize');
		});
		const theme = useTheme();
		const arrowSize = computed(() =>
			hasArrowSizeOverride.value
				? props.arrowSize
				: Number.parseFloat(
						theme.variables.value['--sy-tooltip-arrow-size'] ?? String(DEFAULT_TOOLTIP_ARROW_SIZE),
					),
		);
		const floatingProps = new Proxy(props, {
			get(target, key, receiver) {
				if (key === 'arrowSize') return arrowSize.value;
				return Reflect.get(target, key, receiver);
			},
		}) as Readonly<TooltipProps>;
		const visibility = useTooltipVisible();
		const floating = useTooltipFloating(floatingProps, visibility.visible);

		// 渲染并保留触发节点原有事件
		const renderTrigger = () => {
			const triggerNode = getTriggerNode(slots.default?.());

			if (!triggerNode) return null;

			const triggerEvents =
				props.trigger === 'hover'
					? {
							onMouseenter: visibility.show,
							onMouseleave: visibility.scheduleHide,
						}
					: {
							onClick: visibility.toggle,
						};

			return cloneVNode(
				triggerNode,
				{
					ref: floating.reference,
					...triggerEvents,
				},
				true,
			);
		};

		// 渲染显示中的 Tooltip 内容
		const renderContent = () => {
			if (!visibility.visible.value) return null;

			const arrowStyle = props.showArrow
				? getArrowStyle(floating.middlewareData.value, floating.resolvedPlacement.value, arrowSize.value)
				: undefined;

			const hoverEvents =
				props.trigger === 'hover'
					? {
							onMouseenter: visibility.clearLeaveTimer,
							onMouseleave: visibility.hide,
						}
					: {};

			const tooltipProps = {
				content: props.content,
				color: hasColorOverride.value ? props.color : undefined,
				type: props.type,
				showArrow: props.showArrow,
				arrowSize: arrowSize.value,
				placement: floating.resolvedPlacement.value,
				floatingRef: floating.floating,
				arrowRef: floating.floatingArrow,
				floatingStyle: floating.floatingStyles.value,
				arrowStyle,
				customStyle: props.customStyle,
				...hoverEvents,
			};

			// 仅存在内容插槽时才传入默认插槽
			if (slots.content) {
				return <TooltipContent {...tooltipProps}>{slots.content()}</TooltipContent>;
			}

			return <TooltipContent {...tooltipProps} />;
		};

		return () => (
			<>
				{renderTrigger()}
				{renderContent()}
			</>
		);
	},
});
