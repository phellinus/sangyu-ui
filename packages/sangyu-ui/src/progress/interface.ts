export type ProgressType = 'line' | 'circle';

export interface ProgressProps {
	percentage?: number;
	type?: ProgressType;
	showInfo?: boolean;
	color?: string;
	trackColor?: string;
	size?: number;
	borderRadius?: number;
	customStyle?: string;
}
