import classNames from 'classnames';
import { computed } from 'vue';

type BEMType = string | [string, 'B' | 'E' | 'M' | undefined];
export function useClassnames(componentName: string) {
    const prefix = 'sy';
    const componentClass = `${prefix}-${componentName}`;
    const c = (...arg: BEMType[]) => {
        // return `${componentClass}-${suffix}`;
        if (arg.length)
            return arg.reduce((prev, cur) => {
                if (Array.isArray(cur)) {
                    const arg1 = cur[0];
                    const arg2 = cur[1];
                    if (arg2 === 'E') {
                        return `${prev}__${arg1}`;
                    } else if (arg2 === 'M') {
                        return `${prev}--${arg1}`;
                    }
                }
                return `${prev}-${cur}`;
            }, componentClass) as string;

        return componentClass;
    };
    const ce = (e: string) => [e, 'E'] as BEMType;
    const cm = (e: string) => [e, 'M'] as BEMType;
    const cx = (cls: () => Record<string, boolean>) => {
        return computed(() => classNames(cls()));
    };
    return {
        c,
        cx,
        ce,
        cm,
    };
}
