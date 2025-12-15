import { Placement } from '@floating-ui/vue';
import { CSSProperties } from 'vue';

type BasePlacement = 'top' | 'bottom' | 'left' | 'right';

export function getArrowStyle(
	middlewareData: { value: any },
	placement: { value: Placement },
	arrowSize = 8,
): CSSProperties {
	const data = middlewareData.value ?? {};
	const basePlacement = ((data.placement ?? placement.value) as string).split('-')[0] as BasePlacement;

	const staticSide = {
		top: 'bottom',
		bottom: 'top',
		left: 'right',
		right: 'left',
	}[basePlacement] as 'top' | 'bottom' | 'left' | 'right';

	const half = arrowSize / 2;

	return {
		position: 'absolute',
		left: data.arrow?.x != null ? `${data.arrow.x}px` : '',
		top: data.arrow?.y != null ? `${data.arrow.y}px` : '',
		[staticSide]: `-${half}px`,
	};
}
