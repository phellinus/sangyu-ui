import type { CSSProperties, VNodeChild } from 'vue';

export type ButtonVariant = 'filled' | 'border' | 'flat' | 'line' | 'gradient' | 'relief';

export type ButtonSize = 'small' | 'default' | 'large';
export type ButtonRadius = 'small' | 'default' | 'large';
export type ButtonLineOrigin = 'left' | 'right' | 'center';
export type ButtonLinePosition = 'top' | 'bottom';
export type ButtonNativeType = 'button' | 'submit' | 'reset';
export type ButtonTarget = '_self' | '_blank' | '_parent' | '_top' | string;

export interface ButtonProps {
	/** 按钮视觉类型。 */
	type?: ButtonVariant;

	/** 原生 button 的 type，避免与视觉 type 冲突。 */
	nativeType?: ButtonNativeType;

	disabled?: boolean;
	loading?: boolean;

	/** 传入后使用原生 a 元素渲染。 */
	href?: string;
	target?: ButtonTarget;
	rel?: string;

	color?: string;
	textColor?: string;
	size?: ButtonSize;
	radius?: ButtonRadius;

	lineOrigin?: ButtonLineOrigin;
	linePosition?: ButtonLinePosition;

	gradientDirection?: string;
	gradientColorSecondary?: string;

	customStyle?: string | CSSProperties;
}

export interface ButtonEmits {
	(event: 'click' | 'mouseover' | 'mouseout', value: MouseEvent): void;
	(event: 'blur', value: FocusEvent): void;
}

export interface ButtonSlots {
	default?: () => VNodeChild;
	loading?: () => VNodeChild;
}

export interface SyButtonInstance {
	focus: () => void;
	blur: () => void;
}
