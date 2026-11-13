export type CollapseName = string | number;
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
