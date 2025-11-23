export interface ButtonProps {
    type?: 'filled' | 'border' | 'flat' | 'line' | 'gradient' | 'relief';
    disabled?: boolean;
    href?: string;
    color?: string;
    lineOrigin?: 'left' | 'right' | 'center';
    linePosition?: 'top' | 'bottom';
    size?: 'small' | 'default' | 'large';
    textColor?: string;
    radius?: 'small' | 'default' | 'large';
    gradientDirection?: string;
    gradientColorSecondary?: string;
    customStyle?: string;
}
