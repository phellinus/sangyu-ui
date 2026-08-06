import { isEqual } from 'lodash-es';
import { computed, onBeforeUnmount, onMounted, ref, Ref, toRaw, watch } from 'vue';
import { FieldContext, FormItemProps, ValidateTrigger } from '../Form.type';
import { getValue, namePathToString, normalizeNamePath, setValue } from '../utils';
import { useFormContext } from './useFormContext';
import { useValidation } from './useValidation';

/**
 * Form的字段的组合函数
 * @param props
 * @param elementRef
 * @returns
 */
export function useFormItem(props: FormItemProps, elementRef: Ref<HTMLElement | undefined>) {
	const form = useFormContext();

	if (!form || props.name == null) {
		return {
			form,
			errors: ref<string[]>([]),
			validateStatus: ref('' as const),
			touched: ref(false),
			dirty: ref(false),
			validating: ref(false),
			validate: async () => undefined,
			clearValidate: () => undefined,
			resetField: () => undefined,
			onChange: () => undefined,
			onBlur: () => undefined,
		};
	}
	// 当前表单字段对应的数据路径
	const name = normalizeNamePath(props.name);
	// 当前表单字段对应的唯一字符串标识
	const nameKey = namePathToString(name);
	// 当前表单字段注册时保存的初始值
	const initialValue = structuredClone(toRaw(getValue(form.props.model, name)));
	// 当前表单字段的值
	const value = computed(() => getValue(form.props.model, name));
	// 当前表单字段的校验状态和错误信息
	const validation = useValidation({
		name: nameKey,
		label: props.label,
		value,
		model: form.props.model,
		getRules: () => form.getFieldRules(name, props.rules, props.required),
		onValidated(status, errors) {
			form.emitValidate(name, status, errors);
		},
	});
	/**
	 * 根据当前值与初始值的比较结果同步字段修改状态
	 */
	const updateDirty = () => {
		validation.dirty.value = !isEqual(value.value, initialValue);
	};

	watch(value, updateDirty, {
		deep: true,
		flush: 'sync',
	});
	//字段的规则校验
	const validate = async (trigger?: ValidateTrigger) => {
		try {
			await validation.validate(trigger);
		} catch {
			throw validation.errors.value;
		}
	};
	// 重置当前字段的校验
	const resetField = () => {
		setValue(form.props.model, name, structuredClone(initialValue));

		validation.touched.value = false;
		validation.dirty.value = false;
		validation.clearValidate();
	};

	// 当前form-item的聚焦事件处理函数
	const focus = () => {
		const element = elementRef.value;
		const control = element?.querySelector<HTMLElement>('input, textarea, select, button, [tabindex]');

		control?.focus();
	};

	const field: FieldContext = {
		name,
		nameKey,
		initialValue,
		errors: validation.errors,
		validateStatus: validation.validateStatus,
		touched: validation.touched,
		dirty: validation.dirty,
		validating: validation.validating,
		validate,
		resetField,
		clearValidate: validation.clearValidate,
		focus,
		getElement: () => elementRef.value,
	};

	onMounted(() => form.registerField(field));
	onBeforeUnmount(() => form.unregisterField(nameKey));
	//当前字段的值发生变化时，触发change事件，进行校验
	const onChange = () => {
		validation.touched.value = true;
		validate('change').catch(() => undefined);
	};
	// 当前字段失焦时，触发blur事件，进行校验
	const onBlur = () => {
		validation.touched.value = true;
		validate('blur').catch(() => undefined);
	};
	return {
		form,
		...validation,
		validate,
		resetField,
		onChange,
		onBlur,
	};
}
