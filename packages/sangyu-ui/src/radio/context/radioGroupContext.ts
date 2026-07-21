import type { InjectionKey } from 'vue';
import type { RadioGroupContext } from '../Radio.type';

/**
 * RadioGroup 与 Radio/RadioButton 之间共享状态的注入 Key
 */
export const radioGroupKey = Symbol('syRadioGroup') as InjectionKey<RadioGroupContext>;
