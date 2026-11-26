import { toCSSValue } from '../css';
import type { TokenReference } from '../types';

/**
 * 创建基础 Token 引用，例如 base.color.primary.6
 */
export const base = <Path extends `base.${string}`>(path: Path): TokenReference<Path> => ({ ref: path });

/**
 * 创建语义 Token 引用，例如 semantic.color.text
 */
export const semantic = <Path extends `semantic.${string}`>(path: Path): TokenReference<Path> => ({ ref: path });

/**
 * 引用组件已有的 Token，例如 components.switch.activeColor
 * 派生颜色因此可以跟随该组件 Token 的局部覆盖
 */
export const component = <Path extends `components.${string}`>(path: Path): TokenReference<Path> => ({ ref: path });

/**
 * 颜色参数可以是 CSS 颜色字符串，也可以是任一主题层的 Token 引用
 */
type Color = string | TokenReference<`${'base' | 'semantic' | 'components'}.${string}`>;

/**
 * 在 sRGB 色彩空间中混合两种颜色，percentage 表示第一种颜色的百分比
 * 省略第二种颜色时使用透明色，Token 引用在浏览器中按当前主题作用域解析
 */
export const mix = (color: Color, percentage: number, other: Color = 'transparent'): string => {
	return `color-mix(in srgb, ${toCSSValue(color)} ${percentage}%, ${toCSSValue(other)})`;
};

/**
 * 创建包含两个色标的线性渐变，angle 以度为单位
 * 起止颜色分别位于 0% 和 100%，均可引用主题 Token
 */
export const linearGradient = (angle: number, start: Color, end: Color): string => {
	return `linear-gradient(${angle}deg, ${toCSSValue(start)} 0%, ${toCSSValue(end)} 100%)`;
};
