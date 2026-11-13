export type SpaceSize = 'small' | 'medium' | 'large' | number | readonly [horizontal: SpaceGap, vertical: SpaceGap];
export type SpaceGap = 'small' | 'medium' | 'large' | number;
export type SpaceDirection = 'horizontal' | 'vertical';
export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

export interface SpaceProps {
	size?: SpaceSize;
	direction?: SpaceDirection;
	align?: SpaceAlign;
	wrap?: boolean;
	split?: string | number;
}
