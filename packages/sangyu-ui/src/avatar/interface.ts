export interface AvatarProps {
	color: string;
	size: number;
	shape: 'circle' | 'square';
	loading: boolean;
	bdage: boolean;
	badgeColor: string;
	badgePosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
