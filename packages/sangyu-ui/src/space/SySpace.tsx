import { Comment, createTextVNode, defineComponent, Fragment, Text, type PropType, type VNode } from 'vue';
import type { SpaceGap, SpaceProps } from './Space.type';

const gapValue = (value: SpaceGap): string =>
	typeof value === 'number' ? `${value}px` : `var(--sy-space-gap-${value})`;

const meaningfulChildren = (nodes: unknown[]): VNode[] => {
	const children: VNode[] = [];
	for (const node of nodes) {
		if (Array.isArray(node)) {
			children.push(...meaningfulChildren(node));
			continue;
		}
		if (typeof node === 'string' || typeof node === 'number') {
			if (String(node).trim()) children.push(createTextVNode(String(node)));
			continue;
		}
		if (!node || typeof node !== 'object' || !('type' in node)) continue;
		const vnode = node as VNode;
		if (vnode.type === Comment) continue;
		if (vnode.type === Text && !String(vnode.children ?? '').trim()) continue;
		if (vnode.type === Fragment) {
			if (Array.isArray(vnode.children)) children.push(...meaningfulChildren(vnode.children));
			continue;
		}
		children.push(vnode);
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
