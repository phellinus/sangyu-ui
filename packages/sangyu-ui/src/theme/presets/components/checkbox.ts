import { semantic } from '../values';

export const checkboxTokens = {
	size: '16px',
	sizeSmall: '14px',
	sizeLarge: '20px',
	dotRadius: '5px',
	dotRadiusSmall: '4px',
	dotRadiusLarge: '6px',
	fontSize: semantic('semantic.fontSize.md'),
	fontSizeSmall: semantic('semantic.fontSize.sm'),
	fontSizeLarge: semantic('semantic.fontSize.lg'),
	gap: semantic('semantic.spacing.sm'),
	gapSmall: '6px',
	gapLarge: '10px',
	color: semantic('semantic.color.primary'),
	hoverColor: semantic('semantic.color.primaryHover'),
	activeColor: semantic('semantic.color.primaryActive'),
	borderColor: semantic('semantic.color.border'),
	background: semantic('semantic.color.surface'),
	disabledColor: semantic('semantic.color.textDisabled'),
	disabledBackground: semantic('semantic.color.bg'),
	markColor: '#fff',
	squareMarkRadius: '2px',
	focusShadow: semantic('semantic.shadow.focus'),
};

export const checkboxGroupTokens = {
	gapX: '20px',
	gapY: '12px',
};
