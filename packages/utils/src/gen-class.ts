export function useClassnames(componentName: string) {
    const prefix = 'sy';
    const componentClass = `${prefix}-${componentName}`;
    const c = (suffix: string) => {
        return `${componentClass}-${suffix}`;
    };
    return {
        c,
    };
}
