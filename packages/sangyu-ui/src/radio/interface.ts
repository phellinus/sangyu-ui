import { InjectionKey, Ref } from 'vue';

export type RadioShape = 'circle' | 'square';
export type RadioSize = 'small' | 'default' | 'large';
export type RadioGroupDirection = 'horizontal' | 'vertical';

export interface RadioOptionInfo {
	label: string | number | boolean;
}

export interface RadioGroupContext {
	value: Ref<string | number | boolean | undefined>;
	disabled: Ref<boolean>;
	name: Ref<string>;
	size: Ref<RadioSize>;
	direction: Ref<RadioGroupDirection>;
	onChange: (value: string | number | boolean, option: RadioOptionInfo) => void;
}

export interface RadioProps {
	modelValue?: boolean;
	label?: string | number | boolean;
	disabled?: boolean;
	shape?: RadioShape;
	size?: RadioSize;
	name?: string;
	content?: string;
	customStyle?: string;
	onChange?: (checked: boolean, label?: string | number | boolean) => void;
}
export interface RadioButtonProps {
	modelValue?: boolean;
	label?: string | number | boolean;
	disabled?: boolean;
	size?: RadioSize;
	name?: string;
	content?: string;
	customStyle?: string;
	onChange?: (checked: boolean, label?: string | number | boolean) => void;
}
export const radioGroupKey = Symbol('radioGroupKey') as InjectionKey<RadioGroupContext>;
