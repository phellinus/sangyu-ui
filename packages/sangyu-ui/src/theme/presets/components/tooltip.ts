import { toCSSValue } from '../../css';
import { semantic } from '../values';

export const tooltipTokens = {
	background: '#2c3f51',
	textColor: '#ffffff',
	borderColor: '#2c3f51',
	borderBackground: semantic('semantic.color.surface'),
	borderThickShadow: toCSSValue(semantic('semantic.shadow.popover')),
	fontSize: '14px',
	paddingX: semantic('semantic.spacing.sm'),
	paddingY: semantic('semantic.spacing.xs'),
	borderRadius: semantic('semantic.radius.sm'),
	arrowSize: '6px',
	zIndex: '10',
};
