import type { CSSProperties, VNodeChild } from 'vue';

export type TabName = string | number;
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivation = 'automatic' | 'manual';
export type TabsType = 'line' | 'card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export type TabsAlignment = 'default' | 'center' | 'right' | 'fixed';
export type TabsSize = 'mini' | 'small' | 'medium' | 'large';
export type TabsTrigger = 'click' | 'hover';

export interface TabsProps {
	modelValue?: TabName;
	defaultValue?: TabName;
	/** Arco-compatible aliases. `modelValue` / `defaultValue` take precedence. */
	activeKey?: TabName;
	defaultActiveKey?: TabName;
	orientation?: TabsOrientation;
	direction?: TabsOrientation;
	tabPosition?: TabsPosition;
	position?: TabsPosition;
	activation?: TabsActivation;
	type?: TabsType;
	size?: TabsSize;
	alignment?: TabsAlignment;
	trigger?: TabsTrigger;
	lazy?: boolean;
	lazyLoad?: boolean;
	removable?: boolean;
	editable?: boolean;
	showAddButton?: boolean;
	autoSwitch?: boolean;
	color?: string;
	className?: string;
	customStyle?: string | CSSProperties;
}

export interface TabPaneProps {
	name: TabName;
	label?: string;
	title?: string;
	disabled?: boolean;
	closable?: boolean;
	icon?: VNodeChild;
	iconPosition?: 'left' | 'right';
}

export interface TabClickEvent {
	name: TabName;
	event: MouseEvent;
}

export interface TabRemoveEvent {
	name: TabName;
	event: MouseEvent;
}
