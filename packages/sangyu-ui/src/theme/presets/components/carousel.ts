import { mix, semantic } from '../values';

export const carouselTokens = {
	aspectRatio: '16 / 9',
	radius: semantic('semantic.radius.md'),
	background: semantic('semantic.color.surface'),
	color: semantic('semantic.color.text'),
	controlSize: '32px',
	controlRadius: semantic('semantic.radius.round'),
	controlOffset: semantic('semantic.spacing.md'),
	arrowBackground: mix(semantic('semantic.color.surface'), 78),
	arrowColor: semantic('semantic.color.text'),
	arrowHoverBackground: semantic('semantic.color.surface'),
	indicatorOffset: semantic('semantic.spacing.md'),
	indicatorGap: semantic('semantic.spacing.sm'),
	indicatorSize: '8px',
	indicatorRadius: semantic('semantic.radius.round'),
	indicatorColor: mix(semantic('semantic.color.textSecondary'), 65),
	indicatorActiveColor: semantic('semantic.color.primary'),
	indicatorLineWidth: '24px',
	indicatorLineHeight: '4px',
	focusShadow: semantic('semantic.shadow.focus'),
	toggleFontSize: semantic('semantic.fontSize.sm'),
};
