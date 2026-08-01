import { InjectionKey } from 'vue';
import type { FormContext, FormItemContext, FormLabelAlign, FormLayout, FormSize, ValidateTrigger } from '../Form.type';

export const DEFAULT_FORM_LAYOUT: FormLayout = 'horizontal';
export const DEFAULT_LABEL_ALIGN: FormLabelAlign = 'right';
export const DEFAULT_FORM_SIZE: FormSize = 'default';

export const DEFAULT_VALIDATE_TRIGGER: ValidateTrigger[] = ['change', 'blur'];

// 表单事件名
export const FORM_VALIDATE_EVENT = {
	finish: 'finish',
	finishFailed: 'finishFailed',
	validate: 'validate',
} as const;

/** SyForm 组件依赖注入使用的唯一标识 */
export const FORM_CONTEXT_KEY: InjectionKey<FormContext> = Symbol('SY_FORM_CONTEXT');
/** SyFormItem 组件依赖注入使用的唯一标识 */
export const FORM_ITEM_CONTEXT_KEY: InjectionKey<FormItemContext> = Symbol('SY_FORM_ITEM_CONTEXT');
