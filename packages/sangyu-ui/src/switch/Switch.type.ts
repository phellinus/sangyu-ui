import { CSSProperties, VNodeChild } from 'vue';

export type SwitchPrimitive = string | number | boolean;
export type SwitchModelValue = SwitchPrimitive;
export type SwitchSize = 'small' | 'default' | 'large';
export type SwitchShape = 'round' | 'square';

export interface SwitchProps {
	modelValue?: SwitchModelValue;
	activeValue?: SwitchPrimitive;
	inactiveValue?: SwitchPrimitive;
	disabled?: boolean;
	loading?: boolean;
	indeterminate?: boolean;
	size?: SwitchSize;
	shape?: SwitchShape;
	name?: string;
	color?: string;
	inactiveColor?: string;
	checkedText?: string;
	uncheckedText?: string;
	icon?: boolean;
	iconName?: string;
	activeIconName?: string;
	inactiveIconName?: string;
	customStyle?: string | CSSProperties;
	onChange?: (value: SwitchModelValue, checked: boolean) => void;
}

export interface SwitchEmits {
	(event: 'update:modelValue', value: SwitchModelValue): void;
	(event: 'change', value: SwitchModelValue, checked: boolean): void;
}

export interface SwitchSlotProps {
	checked: boolean;
	indeterminate: boolean;
	disabled: boolean;
	loading: boolean;
}

export interface SwitchSlots {
	default?: () => VNodeChild;
	checked?: (props: SwitchSlotProps) => VNodeChild;
	unchecked?: (props: SwitchSlotProps) => VNodeChild;
	thumb?: (props: SwitchSlotProps) => VNodeChild;
}
export interface SySwitchInstance {
	/** 聚焦到底层原生 input */
	focus: () => void;
	/** 让底层原生 input 失焦 */
	blur: () => void;
}
