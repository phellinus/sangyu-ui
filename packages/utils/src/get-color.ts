const themeColorMap: Record<string, string> = {
    primary: 'var(--sy-color-primary)',
    success: 'var(--sy-color-success)',
    warning: 'var(--sy-color-warning)',
    error: 'var(--sy-color-error)',
};
//根据颜色判断是主题色还是自定义色
export function getColor(color?: string) {
    if (!color) {
        return '';
    }
    const normalized = color.trim().toLowerCase();

    return themeColorMap[normalized] ?? color;
}
//设定颜色透明度
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
//给按钮颜色变成换成渐变色变淡
export function darkenColor(color: string, amount = 0.3): string {
    if (!color) return '';

    const normalized = color.trim().toLowerCase();
    const themeColor = themeColorMap[normalized] ?? color;

    if (themeColor.startsWith('var(')) {
        const resolved = getComputedStyle(document.documentElement)
            .getPropertyValue(themeColor.replace('var(', '').replace(')', ''))
            .trim();

        return darkenColor(resolved, amount);
    }

    if (themeColor.startsWith('rgb')) {
        const match = themeColor.match(/rgba?\(([^)]+)\)/);
        if (match) {
            let [r, g, b] = match[1].split(',').map((v) => parseInt(v.trim()));
            r = Math.round(r * (1 - amount));
            g = Math.round(g * (1 - amount));
            b = Math.round(b * (1 - amount));
            return `rgb(${r}, ${g}, ${b})`;
        }
    }

    const hex = themeColor.replace('#', '');
    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);

        r = Math.round(r * (1 - amount));
        g = Math.round(g * (1 - amount));
        b = Math.round(b * (1 - amount));

        return `rgb(${r}, ${g}, ${b})`;
    }

    return themeColor;
}
