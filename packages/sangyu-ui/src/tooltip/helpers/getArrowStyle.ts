import type { Placement } from '@floating-ui/vue';
import type { CSSProperties } from 'vue';

type BasePlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipMiddlewareData {
	arrow?: {
		x?: number;
		y?: number;
	};
}

// 根据浮层最终位置计算箭头坐标
export function getArrowStyle(
	middlewareData: TooltipMiddlewareData,
	placement: Placement,
	arrowSize: number,
): CSSProperties {
	const basePlacement = placement.split('-')[0] as BasePlacement;

	const staticSideMap: Record<BasePlacement, BasePlacement> = {
		top: 'bottom',
		bottom: 'top',
		left: 'right',
		right: 'left',
	};

	return {
		position: 'absolute',
		left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : undefined,
		top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : undefined,
		[staticSideMap[basePlacement]]: `-${arrowSize}px`,
	};
}
