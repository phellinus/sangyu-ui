import type { CSSProperties } from 'vue';

export type CheckboxPrimitive = string | number | boolean;
export type CheckboxValue = CheckboxPrimitive | Record<string, unknown>;
export type CheckboxModelValue = CheckboxValue | CheckboxValue[];
export type CheckboxSize = 'small' | 'default' | 'large';
export type CheckboxDirection = 'horizontal' | 'vertical';
export type CheckboxLabelPosition = 'before' | 'after';

export interface CheckboxProps {
	modelValue?: CheckboxModelValue;
	value?: CheckboxValue;
	trueValue?: CheckboxValue;
	falseValue?: CheckboxValue;
	indeterminate?: boolean;
	disabled?: boolean;
	loading?: boolean;
	size?: CheckboxSize;
	label?: string;
	content?: string;
	labelPosition?: CheckboxLabelPosition;
	lineThrough?: boolean;
	name?: string;
	id?: string;
	color?: string;
	customStyle?: string | CSSProperties;
	onChange?: (value: CheckboxModelValue, checked: boolean) => void;
}

export interface CheckboxGroupProps {
	modelValue?: CheckboxValue[];
	disabled?: boolean;
	min?: number;
	max?: number;
	size?: CheckboxSize;
	direction?: CheckboxDirection;
	name?: string;
	customStyle?: string | CSSProperties;
	onChange?: (value: CheckboxValue[]) => void;
}
