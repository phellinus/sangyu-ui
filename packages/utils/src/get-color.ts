const themeColorMap: Record<string, string> = {
    primary: 'var(--sy-color-primary)',
    success: 'var(--sy-color-success)',
    warning: 'var(--sy-color-warning)',
    warging: 'var(--sy-color-warning)',
    error: 'var(--sy-color-error)',
};

/**
 * Resolves a color token into a CSS value. Recognized tokens (primary, success, warning, error)
 * are mapped to their corresponding CSS variables defined in `var.less`. Custom color values such
 * as hex/rgb strings are returned unchanged.
 */
export function getColor(color?: string) {
    if (!color) {
        return '';
    }
    const normalized = color.trim().toLowerCase();

    return themeColorMap[normalized] ?? color;
}
//实现一个函数，传递两个参数，第一个是颜色，第二个是透明度，给我返回颜色
export function getColorWithAlpha(color: string, alpha: number) {
    const normalized = color.trim().toLowerCase();
    const themeColor = themeColorMap[normalized] ?? color;

    if (themeColor.startsWith('var(')) {
        return `color-mix(in srgb, ${themeColor} ${alpha * 100}%, transparent)`;
    }

    if (themeColor.startsWith('rgb')) {
        return themeColor.replace(')', `,${alpha})`);
    }

    const hex = themeColor.replace('#', '');
    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return themeColor;
}
