export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
export type ResultLayout = 'default' | 'compact';

export interface ResultProps {
	status?: ResultStatus;
	title?: string;
	subTitle?: string;
	icon?: string;
	layout?: ResultLayout;
	customStyle?: string;
}
