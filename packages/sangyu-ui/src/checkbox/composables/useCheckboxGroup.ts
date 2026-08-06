import { computed, provide, type Ref } from 'vue';
import { isEqual } from 'lodash-es';
import { type CheckboxGroupEmits, type CheckboxGroupProps, type CheckboxValue } from '../Checkbox.types';
import { checkboxGroupKey } from '../context';

/** 管理 Group 的选中集合、min/max 限制以及提供给子组件的 Context。 */
export function useCheckboxGroup(
	props: Readonly<CheckboxGroupProps>,
	emit: CheckboxGroupEmits,
	mergedDisabled: Readonly<Ref<boolean>>,
	mergedSize: Readonly<Ref<CheckboxGroupProps['size']>>,
) {
	const modelValue = computed(() => props.modelValue ?? []);

	/** 对象值按结构深比较，避免仅比较对象引用导致选中状态错误。 */
	const contains = (value: CheckboxValue) => modelValue.value.some((item) => isEqual(item, value));

	/** 达到 min 时不能继续取消，达到 max 时不能继续新增。 */
	const isLimitDisabled = (value: CheckboxValue) => {
		const checked = contains(value);
		if (checked && props.min !== undefined) return modelValue.value.length <= props.min;
		if (!checked && props.max !== undefined) return modelValue.value.length >= props.max;
		return false;
	};

	/** 每次生成新数组，不直接修改受控的 modelValue，确保单向数据流。 */
	const toggleValue = (value: CheckboxValue) => {
		if (mergedDisabled.value || isLimitDisabled(value)) return;

		const next = contains(value)
			? modelValue.value.filter((item) => !isEqual(item, value))
			: [...modelValue.value, value];

		emit('update:modelValue', next);
		emit('change', next);
		props.onChange?.(next);
	};

	provide(checkboxGroupKey, {
		modelValue,
		disabled: computed(() => mergedDisabled.value),
		size: computed(() => mergedSize.value ?? 'default'),
		name: computed(() => props.name ?? ''),
		contains,
		isLimitDisabled,
		toggleValue,
	});

	return { modelValue };
}
