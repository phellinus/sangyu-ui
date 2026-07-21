import type { ComputedRef, CSSProperties, InputHTMLAttributes, VNodeChild } from 'vue';

/** Radio 可以绑定的基础值类型 */
export type RadioValue = string | number | boolean;

/** Radio 尺寸 */
export type RadioSize = 'small' | 'default' | 'large';

/** Radio 图标形状 */
export type RadioShape = 'circle' | 'square';

/** RadioGroup 排列方向 */
export type RadioGroupDirection = 'horizontal' | 'vertical';

/** Radio 选项信息 */
export interface RadioOptionInfo {
	/** 当前选项绑定的值 */
	label: RadioValue;
}

/** Radio 与 RadioButton 共用属性 */
export interface RadioCommonProps {
	/**
	 * 选项绑定值
	 * 在 RadioGroup 中用于和 Group 的 modelValue 比较
	 */
	label?: RadioValue;

	/** 是否禁用当前选项 */
	disabled?: boolean;

	/** 单选组件尺寸 */
	size?: RadioSize;

	/**
	 * 原生 Radio 的 name 在 RadioGroup 中会优先使用 Group 统一生成的 name。
	 */
	name?: string;

	/** 原生 Radio 的 id */
	id?: string;

	/** 没有默认插槽时显示的文字 */
	content?: string;

	/** 组件根节点自定义样式 */
	customStyle?: string | CSSProperties;

	/** 传递给原生 input 的额外属性 */
	inputAttrs?: Omit<InputHTMLAttributes, 'type' | 'checked' | 'disabled' | 'name' | 'value'>;
}

/** 基础 Radio 属性 */
export interface RadioProps extends RadioCommonProps {
	/** 独立使用时的选中状态 */
	modelValue?: boolean;

	/** Radio 图标形状 */
	shape?: RadioShape;
}

/** RadioButton 属性 */
export interface RadioButtonProps extends RadioCommonProps {
	/** 独立使用时的选中状态 */
	modelValue?: boolean;
}

/** RadioGroup 属性 */
export interface RadioGroupProps {
	/** 当前选中的 Radio label */
	modelValue?: RadioValue;

	/** 是否禁用整个分组 */
	disabled?: boolean;

	/**
	 * 分组内所有原生 Radio 共用的 name
	 * 未传入时组件会自动生成
	 */
	name?: string;

	/** 分组统一尺寸 */
	size?: RadioSize;

	/** 分组排列方向 */
	direction?: RadioGroupDirection;

	/** 分组根节点自定义样式 */
	customStyle?: string | CSSProperties;
}

/** Radio 和 RadioButton 事件 */
export interface RadioEmits {
	/** 独立使用时更新布尔选中状态 */
	(event: 'update:modelValue', value: boolean): void;

	/** 当前单选项被选中时触发 */
	(event: 'change', checked: boolean, label: RadioValue | undefined, nativeEvent: Event): void;
}

/** RadioGroup 事件 */
export interface RadioGroupEmits {
	/** 更新分组当前值 */
	(event: 'update:modelValue', value: RadioValue): void;

	/** 分组值变化时触发 */
	(event: 'change', value: RadioValue, option: RadioOptionInfo, nativeEvent: Event): void;
}

/** RadioGroup 注入给子选项的上下文 */
export interface RadioGroupContext {
	/** 分组当前值 */
	modelValue: ComputedRef<RadioValue | undefined>;

	/** 分组禁用状态 */
	disabled: ComputedRef<boolean>;

	/** 分组内原生 Radio 共用名称 */
	name: ComputedRef<string>;

	/** 分组统一尺寸 */
	size: ComputedRef<RadioSize>;

	/** 选择指定选项 */
	select: (value: RadioValue, nativeEvent: Event) => void;
}

/** Radio 默认插槽 */
export interface RadioSlots {
	default?: () => VNodeChild;
}

/** RadioGroup 默认插槽 */
export interface RadioGroupSlots {
	default?: () => VNodeChild;
}

/** Radio 对外暴露的方法 */
export interface SyRadioInstance {
	/** 聚焦原生 Radio */
	focus: () => void;

	/** 让原生 Radio 失焦 */
	blur: () => void;
}
