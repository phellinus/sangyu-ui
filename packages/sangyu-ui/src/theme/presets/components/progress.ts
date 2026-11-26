import { mix, semantic } from '../values';

export const progressTokens = {
	defaultColor: semantic('semantic.color.primary'),
	defaultTrackColor: mix(semantic('semantic.color.primary'), 16),
	lineHeight: '8px',
	lineRadius: '999px',
	lineMinWidth: '160px',
	circleSize: '120px',
	infoFontSize: semantic('semantic.fontSize.md'),
	infoInsideFontSize: '21.6px',
	infoColor: semantic('semantic.color.textSecondary'),
	infoInsideColor: semantic('semantic.color.text'),
	trackShadow: `inset 0 1px 2px ${mix(semantic('semantic.color.text'), 6)}`,
	gradientMix: '78%',
	gap: semantic('semantic.spacing.sm'),
};
