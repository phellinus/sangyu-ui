import { inject } from 'vue';
import { FORM_CONTEXT_KEY } from '../constants';

/**
 * 获取表单上下文
 * @returns
 */
export function useFormContext() {
	return inject(FORM_CONTEXT_KEY, undefined);
}
