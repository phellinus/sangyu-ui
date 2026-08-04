import { computed, type Ref } from 'vue';
import type { SelectModelValue, SelectOption, SelectValue, SySelectEmits, SySelectProps } from '../Select.type';

/**
 * 管理 Select 的选中值、选中项和选择行为。
 * 负责把单选 / 多选的 modelValue 统一转换成数组来处理。
 * @param props Select 组件属性
 * @param emit Select 组件事件派发器
 * @param disabled 合并组件自身和 Form 后的最终禁用状态
 */
export function useSelectModel(props: SySelectProps, emit: SySelectEmits, disabled: Readonly<Ref<boolean>>) {
	/** label 模式默认按照多选处理 */
	const isMultiple = computed(() => {
		return props.multiple || props.mode === 'label';
	});
	/** 当前选中值数组；单选也会被转换成长度为 0 或 1 的数组 */
	const values = computed<SelectValue[]>(() => {
		if (isMultiple.value) {
			return Array.isArray(props.modelValue) ? props.modelValue : [];
		}
		if (props.modelValue === undefined || Array.isArray(props.modelValue)) {
			return [];
		}
		return [props.modelValue];
	});
	/**
	 * 根据值数组获取完整选项。
	 * label 模式下，不存在于 options 中的值会生成临时选项。
	 * @param currentValues 当前选中值
	 */
	const resolveOptions = (currentValues: SelectValue[]): SelectOption[] => {
		return currentValues
			.map((value) => {
				const option = props.options.find((item) => item.value === value);

				if (option) return option;

				if (props.mode === 'label') {
					return {
						label: String(value),
						value,
					};
				}
				return undefined;
			})
			.filter((option): option is SelectOption => option !== undefined);
	};
	/**根据当前选中值，从 options 中找到完整的选项对象 */
	const selectedOptions = computed(() => {
		return resolveOptions(values.value);
	});
	/**单选模式下用于回显的 label */
	const selectedLabel = computed(() => {
		if (isMultiple.value) return '';
		return selectedOptions.value[0]?.label ?? '';
	});
	/**
	 * 判断指定 option 是否处于选中状态。
	 * @param option 当前选项
	 */
	const isSelected = (option: SelectOption) => {
		return values.value.includes(option.value);
	};
	/**
	 * 统一派发 v-model 和 change 事件。
	 * @param value 下一次选中值
	 * @param option 下一次选中的选项对象
	 */
	const updateValue = (value: SelectModelValue, option?: SelectOption | SelectOption[]) => {
		emit('update:modelValue', value);
		emit('change', value, option);
	};

	/**
	 * 选择或取消选择某个选项。
	 * 单选时直接写入 option.value；多选时在数组中增删对应值。
	 * @param option 被点击或键盘确认的选项
	 */
	const selectOption = (option: SelectOption) => {
		if (disabled.value || option.disabled) return;

		if (isMultiple.value) {
			const current = values.value;
			const exists = current.includes(option.value);

			const next = exists ? current.filter((value) => value !== option.value) : [...current, option.value];

			if (!exists && props.max && next.length > props.max) {
				return;
			}

			updateValue(next, resolveOptions(next));
			return;
		}

		updateValue(option.value, option);
	};
	/**
	 * 移除多选模式下的某个已选项。
	 * @param value 需要移除的选项值
	 */
	const removeOption = (value: SelectValue) => {
		if (disabled.value) return;

		const next = values.value.filter((item) => item !== value);

		updateValue(next, resolveOptions(next));
	};

	/**
	 * 清空当前选中值。
	 * 单选清空为 undefined，多选清空为空数组。
	 */
	const clearValue = () => {
		if (disabled.value) return;
		const emptyValue = isMultiple.value ? ([] as SelectValue[]) : undefined;
		updateValue(emptyValue, isMultiple.value ? [] : undefined);
		emit('clear');
	};
	return {
		isMultiple,
		values,
		selectedOptions,
		selectedLabel,
		isSelected,
		selectOption,
		removeOption,
		clearValue,
	};
}
