import { base } from './values';

const commonSemantic = {
	spacing: {
		xs: base('base.spacing.xs'),
		sm: base('base.spacing.sm'),
		md: base('base.spacing.md'),
		lg: base('base.spacing.lg'),
		xl: base('base.spacing.xl'),
	},
	controlHeight: {
		sm: base('base.controlHeight.sm'),
		md: base('base.controlHeight.md'),
		lg: base('base.controlHeight.lg'),
	},
	control: {
		radius: base('base.radius.lg'),
		fieldWidth: '240px',
	},
	fontSize: { sm: base('base.fontSize.sm'), md: base('base.fontSize.md'), lg: base('base.fontSize.lg') },
	radius: {
		sm: base('base.radius.sm'),
		md: base('base.radius.md'),
		lg: base('base.radius.lg'),
		round: base('base.radius.round'),
	},
	shadow: {
		control: base('base.shadow.control'),
		focus: base('base.shadow.focus'),
		popover: base('base.shadow.popover'),
		overlay: base('base.shadow.overlay'),
	},
};

const colorReferences = {
	primary: base('base.color.primary.6'),
	primaryHover: base('base.color.primary.5'),
	primaryActive: base('base.color.primary.7'),
	primarySelect: base('base.color.primary.1'),
	success: base('base.color.success.6'),
	successHover: base('base.color.success.5'),
	successActive: base('base.color.success.7'),
	successSelect: base('base.color.success.1'),
	warning: base('base.color.warning.6'),
	warningHover: base('base.color.warning.5'),
	warningActive: base('base.color.warning.7'),
	warningSelect: base('base.color.warning.1'),
	error: base('base.color.error.5'),
	errorHover: base('base.color.error.4'),
	errorActive: base('base.color.error.7'),
	errorSelect: base('base.color.error.1'),
};

export const lightSemantic = {
	color: {
		...colorReferences,
		base: '#000000e0',
		text: '#000000e0',
		textSecondary: '#000000a6',
		textDisabled: '#00000040',
		border: '#d9d9d9',
		divider: '#0505050f',
		bg: '#f5f5f5',
		surface: '#ffffff',
	},
	...commonSemantic,
};

export const darkSemanticOverride = {
	color: {
		base: '#ffffffd9',
		text: '#ffffffd9',
		textSecondary: '#ffffffa6',
		textDisabled: '#ffffff40',
		border: '#424242',
		divider: '#ffffff1f',
		bg: '#141414',
		surface: '#1f1f1f',
	},
};
