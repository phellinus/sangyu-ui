import { filterEmpty, isBaseType } from '@v-c/utils';
import type { VNode } from 'vue';

// 获取 Tooltip 唯一允许的触发节点
export function getTriggerNode(nodes: VNode[] | undefined): VNode | null {
	const children = filterEmpty(nodes);

	if (!children || children.length === 0) {
		return null;
	}

	if (children.length > 1) {
		console.warn('SyTooltip: only one child is allowed');
		return null;
	}

	const triggerNode = children[0];

	if (isBaseType(triggerNode)) {
		console.warn('SyTooltip: must have a child component');
		return null;
	}

	return triggerNode as VNode;
}
