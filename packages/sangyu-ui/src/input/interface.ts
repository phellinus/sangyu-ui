export interface InputProps {
	width?: string;
	height?: string;
	modelValue?: string;
	bgColor?: string;
	labelColor?: string; //触发后的label的颜色
	textColor?: string; //输入框文字颜色
	customStyle?: string; //自定义样式
	focusColor?: string; //输入框聚焦后的颜色。边框和图标的颜色
	borderColor?: string; //边框颜色
	disabled?: boolean; //是否禁用
	label?: string; //label
	lineColor?: string; //'bottom-line'的类型的下划线颜色
	focuLine?: string; //输入框聚焦后的底部线段的颜色
	size?: 'small' | 'default' | 'large';
	placeholder?: string;
	type?: 'filled' | 'border' | 'label-border' | 'underline' | 'bottom-line';
	clearable?: boolean;
	password?: boolean; //是否是密码框
	showPassword?: boolean;
}

export const originInputProps = ['autocomplete'];
