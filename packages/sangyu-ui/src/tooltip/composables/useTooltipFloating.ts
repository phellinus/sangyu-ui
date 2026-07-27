import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import { computed, nextTick, ref, watch } from 'vue';
import type { TooltipProps } from '../Tooltip.type';
import {
	DEFAULT_TOOLTIP_ARROW_SIZE,
	DEFAULT_TOOLTIP_OFFSET,
	DEFAULT_TOOLTIP_PLACEMENT,
	TOOLTIP_ARROW_OFFSET,
} from '../constants';

// 管理 Tooltip 与触发节点的浮动定位
export function useTooltipFloating(props: Readonly<TooltipProps>, visible: { value: boolean }) {
	const reference = ref<HTMLElement | null>(null);
	const floating = ref<HTMLElement | null>(null);
	const floatingArrow = ref<HTMLElement | null>(null);

	const placement = computed(() => props.placement ?? DEFAULT_TOOLTIP_PLACEMENT);

	const middleware = computed(() => {
		const arrowSize = props.arrowSize ?? DEFAULT_TOOLTIP_ARROW_SIZE;
		const showArrow = props.showArrow !== false;
		const distance = showArrow ? arrowSize + TOOLTIP_ARROW_OFFSET : DEFAULT_TOOLTIP_OFFSET;

		const list = [offset(distance), flip(), shift({ padding: 8 })];

		if (showArrow) {
			list.push(arrow({ element: floatingArrow }));
		}

		return list;
	});

	const {
		floatingStyles,
		middlewareData,
		placement: resolvedPlacement,
		update,
	} = useFloating(reference, floating, {
		placement,
		strategy: 'fixed',
		middleware,
		whileElementsMounted: autoUpdate,
	});

	// 浮层重新显示后更新一次定位
	watch(visible, async (value) => {
		if (!value) return;

		await nextTick();
		update();
	});

	return {
		reference,
		floating,
		floatingArrow,
		floatingStyles,
		middlewareData,
		resolvedPlacement,
	};
}
