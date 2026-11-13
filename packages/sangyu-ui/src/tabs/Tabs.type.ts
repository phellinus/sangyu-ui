export type TabName = string | number;
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivation = 'automatic' | 'manual';

export interface TabsProps {
	modelValue?: TabName;
	defaultValue?: TabName;
	orientation?: TabsOrientation;
	activation?: TabsActivation;
	lazy?: boolean;
}

export interface TabPaneProps {
	name: TabName;
	label?: string;
	disabled?: boolean;
}
