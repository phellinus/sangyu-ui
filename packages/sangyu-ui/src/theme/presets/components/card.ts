import { toCSSValue } from '../../css';
import { semantic } from '../values';

export const cardTokens = {
	background: semantic('semantic.color.surface'),
	borderColor: semantic('semantic.color.border'),
	headerColor: semantic('semantic.color.text'),
	contentColor: semantic('semantic.color.textSecondary'),
	sectionBorderColor: semantic('semantic.color.divider'),
	shadowAlways: `0 20px 48px -12px rgba(140, 144, 150, 0.2), 0 8px 20px -6px rgba(140, 144, 150, 0.12), inset 0 0 0 1px ${toCSSValue(semantic('semantic.color.surface'))}`,
	shadowHover: `0 20px 48px -12px rgba(140, 144, 150, 0.2), 0 8px 20px -6px rgba(140, 144, 150, 0.12), inset 0 0 0 1px ${toCSSValue(semantic('semantic.color.surface'))}`,
	borderRadius: '20px',
	headerPadding: '20px 24px 16px',
	headerFontSize: '18px',
	contentPadding: '20px 24px',
	contentFontSize: semantic('semantic.fontSize.md'),
	contentLineHeight: '1.6',
	footerPadding: '16px 24px',
	footerGap: semantic('semantic.spacing.sm'),
};
