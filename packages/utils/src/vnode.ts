import { Comment, Fragment, Text, type VNode, type VNodeChild } from 'vue';

export function isBaseType(value: unknown): value is string | number | boolean | symbol | null | undefined {
	return (
		value === null ||
		value === undefined ||
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean' ||
		typeof value === 'symbol'
	);
}

export function filterEmpty(children: VNodeChild[] = []): VNodeChild[] {
	const result: VNodeChild[] = [];

	children.forEach((child) => {
		if (Array.isArray(child)) {
			result.push(...child);
		} else if ((child as VNode | null | undefined)?.type === Fragment) {
			result.push(...filterEmpty((child as VNode).children as VNodeChild[]));
		} else {
			result.push(child);
		}
	});

	return result.filter((child) => {
		const node = child as VNode | null | undefined;

		return !(
			node &&
			(node.type === Comment ||
				(node.type === Fragment && (node.children as VNodeChild[]).length === 0) ||
				(node.type === Text && (node.children as string).trim() === ''))
		);
	});
}
