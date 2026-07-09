import { computed } from 'vue';
import { SelectModelValue, SySelectEmits, SySelectProps } from '../Select.type';

/**
 * 管理 Select 的选中值、选中项和选择行为。
 * 负责把单选 / 多选的 modelValue 统一转换成数组来处理。
 */
export function useSelectModel(props: SySelectProps, emit: SySelectEmits) {
	/** 当前选中值数组；单选也会被转换成长度为 0 或 1 的数组 */
	const values = computed<SelectModelValue[]>(() => {
		if (props.multiple) return Array.isArray(props.modelValue) ? props.modelValue : [];
		return props.modelValue === undefined ? [] : [props.modelValue];
	});

	return {
		values,
	};
}
