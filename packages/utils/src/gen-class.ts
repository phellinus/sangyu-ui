import classNames from 'classnames';
import { computed } from 'vue';

export function useClassnames(componentName: string) {
    const prefix = 'sy';
    const componentClass = `${prefix}-${componentName}`;
    const c = (suffix: string) => {
        return `${componentClass}-${suffix}`;
    };
    const cx = (cls: () => Record<string, boolean>) => {
        return computed(() => classNames(cls()));
    };
    return {
        c,
        cx,
    };
}
