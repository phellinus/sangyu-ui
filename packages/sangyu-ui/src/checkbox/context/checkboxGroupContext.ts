import type { ComputedRef, InjectionKey } from 'vue';
import type { CheckboxSize, CheckboxValue } from '../Checkbox.types';

// CheckboxGroup 向子 Checkbox 提供的内部通信协议。
export interface CheckboxGroupContext {
	// 当前已选值数组。
	modelValue: ComputedRef<CheckboxValue[]>;
	// Group 统一禁用状态。
	disabled: ComputedRef<boolean>;
	// 子 Checkbox 继承的 Group 尺寸。
	size: ComputedRef<CheckboxSize>;
	// 子 input 继承的原生 name。
	name: ComputedRef<string>;
	// 判断 Group 当前是否包含指定选项值。
	contains: (value: CheckboxValue) => boolean;
	// 判断 min 或 max 限制是否禁止切换指定选项。
	isLimitDisabled: (value: CheckboxValue) => boolean;
	// 添加或移除选项，并提交新的 Group 值。
	toggleValue: (value: CheckboxValue) => void;
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupKey');
