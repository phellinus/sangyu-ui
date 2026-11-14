/** 单个方向上的预设或自定义间距 */
export type SpaceGap = 'small' | 'medium' | 'large' | number;

/** 预设尺寸、数字间距或水平与垂直间距元组 */
export type SpaceSize = 'small' | 'medium' | 'large' | number | readonly [horizontal: SpaceGap, vertical: SpaceGap];

/** 子项的排列方向 */
export type SpaceDirection = 'horizontal' | 'vertical';

/** 子项在交叉轴上的对齐方式 */
export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

/** SySpace 的布局参数 */
export interface SpaceProps {
	/** 预设、数字或分别表示水平与垂直间距的元组 */
	size?: SpaceSize;
	/** 子项排列方向 */
	direction?: SpaceDirection;
	/** 子项交叉轴对齐方式 */
	align?: SpaceAlign;
	/** 是否允许子项换行 */
	wrap?: boolean;
	/** 插入有效子项之间的文本或数字 */
	split?: string | number;
}
