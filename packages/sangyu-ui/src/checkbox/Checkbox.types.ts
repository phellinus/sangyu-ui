/* eslint-disable @typescript-eslint/unified-signatures */
import type { CSSProperties } from 'vue';

//Checkbox 与原生表单字段支持的基础值类型。
export type CheckboxPrimitive = string | number | boolean;
//单个 Checkbox 选项代表的值；对象值通过深比较判断是否相等。
export type CheckboxValue = CheckboxPrimitive | Record<string, unknown>;
//单独使用时为单值，CheckboxGroup 使用值数组。
export type CheckboxModelValue = CheckboxValue | CheckboxValue[];
export type CheckboxSize = 'small' | 'default' | 'large';
export type CheckboxDirection = 'horizontal' | 'vertical';
export type CheckboxLabelPosition = 'before' | 'after';

export interface CheckboxProps {
	modelValue?: CheckboxModelValue;
	//在 CheckboxGroup 中标识当前选项的值，默认值为 true。
	value?: CheckboxValue;
	//单独使用时，选中后写入 modelValue 的值，默认值为 true。
	trueValue?: CheckboxValue;
	//单独使用时，取消选中后写入 modelValue 的值，默认值为 false。
	falseValue?: CheckboxValue;
	//是否显示半选状态；只控制视觉和 aria-checked，不直接修改绑定值。
	indeterminate?: boolean;
	//是否禁用；禁用后阻止鼠标和键盘交互。
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
	//v-model 绑定的已选值数组。
	modelValue?: CheckboxValue[];
	// 是否禁用组内全部 Checkbox。
	disabled?: boolean;
	// 最少必须保留的选中数量。
	min?: number;
	// 最多允许选中的数量。
	max?: number;
	// 组内所有 Checkbox 继承的尺寸。
	size?: CheckboxSize;
	// 选项按横向或纵向排列。
	direction?: CheckboxDirection;
	// 子 Checkbox 原生 input 继承的 name。
	name?: string;
	// 应用于 Group 根元素的自定义内联样式。
	customStyle?: string | CSSProperties;
	// Group change 事件对应的回调属性。
	onChange?: (value: CheckboxValue[]) => void;
}
/** SyCheckbox 对外暴露的事件类型。 */
export interface CheckboxEmits {
	// 有效交互后更新 v-model。
	(event: 'update:modelValue', value: CheckboxModelValue): void;
	// 返回更新后的值以及最终选中状态。
	(event: 'change', value: CheckboxModelValue, checked: boolean): void;
}

// SyCheckboxGroup 对外暴露的事件类型。
export interface CheckboxGroupEmits {
	// 更新 Group 的已选值数组。
	(event: 'update:modelValue', value: CheckboxValue[]): void;
	// 有效变更后返回完整的已选值数组。
	(event: 'change', value: CheckboxValue[]): void;
}
