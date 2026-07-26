import type { Placement } from '@floating-ui/vue';
import type { CSSProperties } from 'vue';

// Tooltip 支持的触发方式
export type TooltipTrigger = 'hover' | 'click';

// Tooltip 支持的视觉类型
export type TooltipType = 'filled' | 'border' | 'border-thick';

// Tooltip 对外属性
export interface TooltipProps {
	// 浮层相对触发元素的展示位置
	placement?: Placement;

	// 简单文本内容
	content?: string;

	// Tooltip 主题颜色
	color?: string;

	// Tooltip 触发方式
	trigger?: TooltipTrigger;

	// Tooltip 视觉类型
	type?: TooltipType;

	// 是否展示箭头
	showArrow?: boolean;

	// 箭头尺寸
	arrowSize?: number;

	// Tooltip 自定义内联样式
	customStyle?: CSSProperties;
}
