export interface SyTagProps {
	type?: string;
	color?: string;
	bgColor?: string;
	hit?: boolean; //是否存在描边边框
	size?: 'small' | 'default' | 'large';
	borderRadius?: number | string;
	customStyle?: string;
}
