import { toCSSValue } from '../../css';
import { semantic } from '../values';

export const drawerTokens = {
	maskBackground: 'rgba(0, 0, 0, 0.45)',
	panelBackground: semantic('semantic.color.surface'),
	panelColor: semantic('semantic.color.text'),
	panelShadow: toCSSValue(semantic('semantic.shadow.overlay')),
	headerMinHeight: '56px',
	headerPadding: '12px 20px',
	headerBorderColor: semantic('semantic.color.divider'),
	titleFontSize: '16px',
	closeSize: '32px',
	closeRadius: '8px',
	closeColor: semantic('semantic.color.textSecondary'),
	closeHoverBackground: semantic('semantic.color.bg'),
	closeHoverColor: semantic('semantic.color.text'),
	focusColor: semantic('semantic.color.primary'),
	bodyPadding: '20px',
	footerPadding: '12px 20px',
	footerBorderColor: semantic('semantic.color.divider'),
};
