import { Comment, Fragment, isVNode } from 'vue';
import type { VNode, VNodeChild } from 'vue';

/** 扁平化处理 */
export function flattenChildren(children: VNodeChild[]): VNode[] {
	const result: VNode[] = [];

	children.forEach((child) => {
		if (Array.isArray(child)) {
			result.push(...flattenChildren(child));
			return;
		}

		if (!isVNode(child) || child.type === Comment) {
			return;
		}

		if (child.type === Fragment && Array.isArray(child.children)) {
			result.push(...flattenChildren(child.children as VNodeChild[]));
			return;
		}

		result.push(child);
	});

	return result;
}
