import { cloneVNode, defineComponent, mergeProps, type PropType } from 'vue';
import type { Placement } from '@floating-ui/vue';
import { useClassnames } from '@sangyu-ui/utils';
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
		const { c } = useClassnames('tooltip');
		const visibility = useTooltipVisible();
		const floating = useTooltipFloating(props, visibility.visible);

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
				mergeProps(triggerNode.props ?? {}, {
					ref: floating.reference,
					...triggerEvents,
				}),
			);
		};

		// 渲染显示中的 Tooltip 内容
		const renderContent = () => {
			if (!visibility.visible.value) return null;

			const arrowStyle = props.showArrow
				? getArrowStyle(floating.middlewareData.value, floating.resolvedPlacement.value, props.arrowSize)
				: undefined;

			const hoverEvents =
				props.trigger === 'hover'
					? {
							onMouseenter: visibility.clearLeaveTimer,
							onMouseleave: visibility.hide,
						}
					: {};

			return (
				<TooltipContent
					content={props.content}
					color={props.color}
					type={props.type}
					showArrow={props.showArrow}
					arrowSize={props.arrowSize}
					placement={floating.resolvedPlacement.value}
					floatingRef={floating.floating}
					arrowRef={floating.floatingArrow}
					floatingStyle={floating.floatingStyles.value}
					arrowStyle={arrowStyle}
					customStyle={props.customStyle}
					{...hoverEvents}
				>
					{slots.content?.()}
				</TooltipContent>
			);
		};

		return () => (
			<>
				{renderTrigger()}
				{renderContent()}
			</>
		);
	},
});
