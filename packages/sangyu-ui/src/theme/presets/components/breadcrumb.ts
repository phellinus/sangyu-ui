import { mix, semantic } from '../values';

export const breadcrumbTokens = {
	fontSize: semantic('semantic.fontSize.md'),
	color: semantic('semantic.color.textSecondary'),
	separatorColor: semantic('semantic.color.textDisabled'),
	separatorFontSize: semantic('semantic.fontSize.md'),
	linkHoverColor: semantic('semantic.color.text'),
	linkHoverBg: mix(semantic('semantic.color.border'), 40),
	currentColor: semantic('semantic.color.text'),
	separatorGap: semantic('semantic.spacing.sm'),
	contentGap: '6px',
	paddingX: semantic('semantic.spacing.sm'),
	paddingY: semantic('semantic.spacing.xs'),
	radius: semantic('semantic.radius.md'),
};
