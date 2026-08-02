import { inject } from 'vue';
import { FORM_CONTEXT_KEY } from '../constants';

export function useFormContext() {
	return inject(FORM_CONTEXT_KEY, undefined);
}
