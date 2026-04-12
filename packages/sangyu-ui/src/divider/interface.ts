export type DividerDirection = 'horizontal' | 'vertical';
export type DividerAlign = 'left' | 'center' | 'right';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerThickness = 'thin' | 'medium' | 'thick';

export interface DividerProps {
	direction?: DividerDirection;
	align?: DividerAlign;
	variant?: DividerVariant;
	thickness?: DividerThickness;
	content?: string;
	color?: string;
	width?: string | number;
	height?: string | number;
	margin?: string | number;
	customStyle?: string;
}
