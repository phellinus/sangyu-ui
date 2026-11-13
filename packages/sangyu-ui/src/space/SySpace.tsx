import { Comment, defineComponent, Fragment, Text, type PropType, type VNode } from 'vue';
import type { SpaceGap, SpaceProps } from './Space.type';

const gapValue = (value: SpaceGap): string =>
	typeof value === 'number' ? `${value}px` : `var(--sy-space-gap-${value})`;

const meaningfulChildren = (nodes: VNode[]): VNode[] => {
	const children: VNode[] = [];
	for (const node of nodes) {
		if (node.type === Comment) continue;
		if (node.type === Text && !String(node.children ?? '').trim()) continue;
		if (node.type === Fragment) {
			if (Array.isArray(node.children)) children.push(...meaningfulChildren(node.children as VNode[]));
			continue;
		}
		children.push(node);
	}
	return children;
};

export default defineComponent({
	name: 'SySpace',
	props: {
		size: { type: [String, Number, Array] as PropType<SpaceProps['size']>, default: 'medium' },
		direction: { type: String as PropType<SpaceProps['direction']>, default: 'horizontal' },
		align: { type: String as PropType<SpaceProps['align']>, default: undefined },
		wrap: { type: Boolean, default: false },
		split: { type: [String, Number] as PropType<SpaceProps['split']>, default: undefined },
	},
	setup(props, { slots }) {
		return () => {
			const children = meaningfulChildren(slots.default?.() ?? []);
			const hasSplit = !!slots.split || props.split !== undefined;
			const content: (VNode | string | number)[] = [];
			children.forEach((child, index) => {
				if (index > 0 && hasSplit) {
					content.push(...(slots.split ? slots.split() : [props.split as string | number]));
				}
				content.push(child);
			});
			const [horizontal, vertical] = Array.isArray(props.size)
				? props.size
				: [props.size as SpaceGap, props.size as SpaceGap];
			return (
				<span
					class='sy-space'
					style={{
						flexDirection: props.direction === 'vertical' ? 'column' : 'row',
						flexWrap: props.wrap ? 'wrap' : 'nowrap',
						alignItems: props.align ?? (props.direction === 'vertical' ? 'stretch' : 'center'),
						columnGap: gapValue(horizontal),
						rowGap: gapValue(vertical),
					}}
				>
					{content}
				</span>
			);
		};
	},
});
