import { computed, ref, Ref } from 'vue';
import { FormRule, ValidateStatus } from '../Form.type';

interface UseValidationOptions {
	name: string;
	label?: string;
	value: Ref<unknown>;
	model: Record<string, unknown>;
	getRules: () => FormRule[];
	onValidated?: (status: ValidateStatus, errors: string[]) => void;
}
/**
 * 表单字段验证组合函数
 * @param options
 */
export function useValidation(options: UseValidationOptions) {
	// 当前字段的错误信息列表
	const errors = ref<string[]>([]);
	// 当前字段是否正在执行异步校验
	const validating = ref(false);
	// 当前字段是否已经触发过校验
	const touched = ref(false);
	// 当前字段的值是不是被修改过了
	const dirty = ref(false);
	// 当前字段的校验状态
	const validateStatus = ref<ValidateStatus>('');
	// 验证版本
	let validateVersion = 0;

	const hasError = computed(() => errors.value.length > 0);
}
