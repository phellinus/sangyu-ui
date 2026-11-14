import { Fragment, type VNode } from 'vue';

/**
 * 递归展平插槽中的 Fragment，便于识别面板节点
 */
export function flattenChildren(nodes: VNode[]): VNode[] {
	return nodes.flatMap((node) => (node.type === Fragment ? flattenChildren(node.children as VNode[]) : [node]));
}

// Vue 会将无值的布尔属性解析为空字符串
export function isTabDisabled(node: VNode): boolean {
	const value = node.props?.disabled;
	return value === '' || Boolean(value);
}
