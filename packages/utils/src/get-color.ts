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
