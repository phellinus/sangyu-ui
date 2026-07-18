import type { CSSProperties, ComputedRef, Ref, VNodeChild } from 'vue';

export type MenuMode = 'horizontal' | 'vertical';
export type MenuVerticalPosition = 'left' | 'right';
export type MenuItemPosition = 'left' | 'center' | 'right';
export type MenuIconPosition = 'left' | 'right';

export interface MenuProps {
	defaultIndex?: string;
	mode?: MenuMode;
	hoverBgColor?: string;
	hoverColor?: string;
	customStyle?: string | CSSProperties;
	verticalPosition?: MenuVerticalPosition;
	itemPosition?: MenuItemPosition;
	expand?: boolean;
	defaultOpenSubMenus?: string[];

	onSelect?: (index: string, to?: string) => void;
	onOpenChange?: (openKeys: string[]) => void;
}

export interface MenuItemProps {
	index?: string;
	disabled?: boolean;
	customStyle?: string | CSSProperties;
	id?: string;
	icon?: string;
	iconPosition?: MenuIconPosition;
	pure?: boolean;
	to?: string;
}

export interface SubMenuProps {
	index?: string;
	title?: string;
	className?: string;
	customStyle?: string | CSSProperties;
	disabled?: boolean;
	id?: string;
	icon?: string;
	onlyExpand?: boolean;
}

export interface MenuEmits {
	(event: 'select', index: string, to?: string): void;
	(event: 'openChange', openKeys: string[]): void;
}

export interface MenuContext {
	mode: ComputedRef<MenuMode>;
	expand: ComputedRef<boolean>;
	activeIndex: Ref<string>;
	openKeys: Ref<string[]>;
	ancestors: ComputedRef<string[]>;

	nextIndex: () => string;
	select: (index: string, to?: string) => void;
	toggleSubMenu: (index: string) => void;
	isSubMenuOpen: (index: string) => boolean;
	isSubMenuActive: (index: string) => boolean;

	registerItem: (index: string, ancestors: string[]) => () => void;
}

export interface MenuSlots {
	default?: () => VNodeChild;
}

export interface MenuItemSlots {
	default?: () => VNodeChild;
}

export interface SubMenuSlots {
	default?: () => VNodeChild;
	title?: () => VNodeChild;
}
