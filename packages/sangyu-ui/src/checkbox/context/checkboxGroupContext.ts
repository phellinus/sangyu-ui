import type { ComputedRef, InjectionKey } from 'vue';
import type { CheckboxSize, CheckboxValue } from '../Checkbox.types';

export interface CheckboxGroupContext {
	modelValue: ComputedRef<CheckboxValue[]>;
	disabled: ComputedRef<boolean>;
	size: ComputedRef<CheckboxSize>;
	name: ComputedRef<string>;
	contains: (value: CheckboxValue) => boolean;
	isLimitDisabled: (value: CheckboxValue) => boolean;
	toggleValue: (value: CheckboxValue) => void;
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupKey');
