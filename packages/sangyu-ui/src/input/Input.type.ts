import type { CSSProperties, InputHTMLAttributes, VNodeChild } from 'vue';

export type InputSize = 'small' | 'default' | 'large';

export type InputVariant = 'filled' | 'border' | 'label-border' | 'underline' | 'bottom-line';

export type InputNativeType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';

export interface InputProps {
	modelValue?: string;

	/** 输入框视觉类型，为兼容旧 API 继续使用 type。 */
	type?: InputVariant;

	/** 原生 input type。 */
	nativeType?: InputNativeType;

	size?: InputSize;
	disabled?: boolean;
	readonly?: boolean;
	clearable?: boolean;

	/** 兼容原有密码输入框 API。 */
	password?: boolean;
	showPassword?: boolean;

	id?: string;
	name?: string;
	autocomplete?: string;
	placeholder?: string;
	label?: string;
	maxlength?: number;
	minlength?: number;

	width?: string;
	height?: string;

	bgColor?: string;
	textColor?: string;
	labelColor?: string;
	borderColor?: string;
	focusColor?: string;
	lineColor?: string;
	focuLine?: string;

	clearAriaLabel?: string;

	customStyle?: string | CSSProperties;

	/**
	 * 传递给原生 input 的额外属性。
	 * class、aria-*、inputmode 等可以通过这里传入。
	 */
	inputAttrs?: Omit<InputHTMLAttributes, 'value' | 'type' | 'disabled' | 'readonly' | 'placeholder'>;
}

export interface InputEmits {
	(event: 'update:modelValue', value: string): void;
	(event: 'input' | 'change', value: string, nativeEvent: Event): void;
	(event: 'focus' | 'blur', nativeEvent: FocusEvent): void;
	(event: 'clear', nativeEvent: MouseEvent): void;
}

export interface InputSlots {
	prefix?: () => VNodeChild;
	suffix?: () => VNodeChild;
	fronticon?: () => VNodeChild;
	backicon?: () => VNodeChild;
	'clear-icon'?: () => VNodeChild;
}

export interface SyInputInstance {
	focus: () => void;
	blur: () => void;
	select: () => void;
}
