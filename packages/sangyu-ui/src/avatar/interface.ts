export interface AvatarProps {
	bgcolor?: string;
	color?: string;
	size?: number;
	shape?: 'circle' | 'square';
	loading?: boolean;
	bdage?: boolean;
	badgeColor?: string;
	badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	customStyle?: string;
	icon?: string; //图标头像
	iconsize?: number;
	src?: string;
}
