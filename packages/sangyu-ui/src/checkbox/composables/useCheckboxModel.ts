import { computed, inject } from 'vue';
import { CheckboxEmits, CheckboxProps, CheckboxValue } from '../Checkbox.types';
import { checkboxGroupKey } from '../context';
import { isEqual } from 'lodash-es';

/**
 * 统一处理独立 Checkbox、数组绑定和 CheckboxGroup 三种值模型。
 * @param props
 * @param emit
 * @returns
 */
export function useCheckboxModel(props: Readonly<CheckboxProps>, emit: CheckboxEmits) {
	const group = inject(checkboxGroupKey, null);
	const optionValue = computed<CheckboxValue>(() => props.value ?? true);
	const trueValue = computed<CheckboxValue>(() => props.value ?? true);
	const falseValue = computed<CheckboxValue>(() => props.falseValue ?? false);

	//Group 和数组模式通过成员关系判断选中；单值模式与 trueValue 比较。
	const checked = computed(() => {
		if (group) {
			return group.contains(optionValue.value);
		}
		if (Array.isArray(props.modelValue)) {
			return props.modelValue.some((item) => isEqual(item, optionValue.value));
		}
		return isEqual(props.modelValue, trueValue.value);
	});
	//判断是否限制是否禁止切换指定选项
	const limitDisabled = computed(() => group?.isLimitDisabled(optionValue.value) ?? false);
	//只向外提交新值，不在内部持久化副本，父组件始终是唯一数据源。
	const toggle = () => {
		const nextChecked = !checked.value;
		// Group 模式由 Context 统一维护数组，保证 min/max 限制集中生效。
		if (group) {
			group.toggleValue(optionValue.value);
			emit('change', optionValue.value, nextChecked);
			props.onChange?.(optionValue.value, nextChecked);
			return;
		}
		//直接绑定数组时，根据 value 在数组中执行不可变的添加或删除。
		if (Array.isArray(props.modelValue)) {
			const nextValue = nextChecked
				? [...props.modelValue, optionValue.value]
				: props.modelValue.filter((item) => !isEqual(item, optionValue.value));
			emit('update:modelValue', nextValue);
			emit('change', nextValue, nextChecked);
			props.onChange?.(nextValue, nextChecked);
			return;
		}
		// 单值模式使用 trueValue/falseValue 支持自定义选中值和未选中值。
		const nextValue = nextChecked ? trueValue.value : falseValue.value;
		emit('update:modelValue', nextValue);
		emit('change', nextValue, nextChecked);
		props.onChange?.(nextValue, nextChecked);
	};
	return { group, checked, limitDisabled, optionValue, toggle };
}
