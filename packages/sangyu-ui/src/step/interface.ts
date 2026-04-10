export type StepDirection = 'horizontal' | 'vertical';
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepsProps {
	active?: number;
	direction?: StepDirection;
	customStyle?: string;
}

export interface StepProps {
	title?: string;
	description?: string;
	icon?: string;
	status?: StepStatus;
	index?: number;
	total?: number;
	customStyle?: string;
}
