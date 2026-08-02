import { inject } from 'vue';
import { FORM_ITEM_CONTEXT_KEY } from '../constants';

/**
 * 获取表单项上下文
 * @returns
 */
export function useFormItemContext() {
	return inject(FORM_ITEM_CONTEXT_KEY, undefined);
}
