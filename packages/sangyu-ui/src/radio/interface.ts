export type RadioShape = 'circle' | 'square';
export type RadioSize = 'small' | 'default' | 'large';
export type RadioGroupDirection = 'horizontal' | 'vertical';

export interface RadioOptionInfo {
	label: string | number | boolean;
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
