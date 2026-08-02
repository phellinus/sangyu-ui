import { computed, ref, Ref } from 'vue';
import { FormRule, ValidateStatus, ValidateTrigger } from '../Form.type';
import { matchesTrigger, validateValue } from '../utils';

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
	// 当前字段校验规则是否有错误
	const hasError = computed(() => errors.value.length > 0);
	// 当前字段的校验状态
	const validate = async (trigger?: ValidateTrigger) => {
		const version = ++validateVersion;

		const rules = options.getRules().filter((rule) => matchesTrigger(rule, trigger));

		if (!rules.length) {
			errors.value = [];
			validateStatus.value = '';
			return;
		}

		validating.value = true;
		validateStatus.value = 'validating';

		const nextErrors = await validateValue({
			name: options.name,
			label: options.label,
			value: options.value.value,
			rules,
			model: options.model,
		});

		if (version !== validateVersion) return;

		errors.value = nextErrors;
		validating.value = false;
		validateStatus.value = nextErrors.length ? 'error' : 'success';

		options.onValidated?.(validateStatus.value, errors.value);

		if (nextErrors.length) {
			throw nextErrors;
		}
	};
	/**
	 * 清除当前字段的校验状态和信息
	 */
	const clearValidate = () => {
		validateVersion += 1;
		errors.value = [];
		validating.value = false;
		validateStatus.value = '';
	};
	return {
		errors,
		hasError,
		validating,
		touched,
		dirty,
		validateStatus,
		validate,
		clearValidate,
	};
}
