export type CollapseName = string | number;
// 多开使用数组，手风琴使用单值
export type CollapseValue = CollapseName[] | CollapseName | undefined;

export interface SyCollapseProps {
	modelValue?: CollapseValue;
	defaultValue?: CollapseValue;
	accordion?: boolean;
}

export interface SyCollapseItemProps {
	name: CollapseName;
	disabled?: boolean;
	lazy?: boolean;
}
