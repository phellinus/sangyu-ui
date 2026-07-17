import type { ComputedRef, CSSProperties } from 'vue';

export interface BreadcrumbProps {
	separator?: string;
	/** @description 设置分隔符图标 */
	separatorIcon?: string;
	//自定义样式
	customStyle?: string | CSSProperties;
	handleClick?: (to?: string) => void;
}

export interface BreadcrumbItemProps {
	to?: string;
}

export interface BreadcrumbContext {
	separator: ComputedRef<string>;
	separatorIcon: ComputedRef<string>;
	handleItemClick: (to?: string) => void;
}
