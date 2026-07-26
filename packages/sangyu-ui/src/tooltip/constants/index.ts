import type { Placement } from '@floating-ui/vue';
import type { TooltipTrigger, TooltipType } from '../Tooltip.type';

// Tooltip 默认展示位置
export const DEFAULT_TOOLTIP_PLACEMENT: Placement = 'top';

// Tooltip 默认背景色
export const DEFAULT_TOOLTIP_COLOR = '#2C3F51';

// Tooltip 默认触发方式
export const DEFAULT_TOOLTIP_TRIGGER: TooltipTrigger = 'hover';

// Tooltip 默认视觉类型
export const DEFAULT_TOOLTIP_TYPE: TooltipType = 'filled';

// Tooltip 默认箭头尺寸
export const DEFAULT_TOOLTIP_ARROW_SIZE = 6;

// Tooltip 无箭头时的间距
export const DEFAULT_TOOLTIP_OFFSET = 6;

// Tooltip 箭头与浮层之间的额外间距
export const TOOLTIP_ARROW_OFFSET = 4;
