import { mix, semantic } from '../values';

export const tabsTokens = {
	color: semantic('semantic.color.textSecondary'),
	activeColor: semantic('semantic.color.primary'),
	hoverColor: semantic('semantic.color.text'),
	borderColor: semantic('semantic.color.border'),
	indicatorColor: semantic('semantic.color.primary'),
	surfaceColor: semantic('semantic.color.surface'),
	panelBackground: semantic('semantic.color.surface'),
	padding: semantic('semantic.spacing.md'),
	gap: semantic('semantic.spacing.sm'),
	panelPadding: semantic('semantic.spacing.md'),
	radius: semantic('semantic.radius.md'),
	heightMini: '24px',
	heightSmall: '32px',
	heightMedium: '40px',
	heightLarge: '48px',
	closeHoverBackground: mix(semantic('semantic.color.text'), 8),
};
