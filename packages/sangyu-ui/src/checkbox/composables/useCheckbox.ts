import { computed, ref, useId, watchEffect } from 'vue';
import { CheckboxEmits, CheckboxProps } from '../Checkbox.types';
import { useCheckboxModel } from './useCheckboxModel';

/**
 * 组合值模型、原生 input 状态以及从 Group 继承的公共属性。
 * @param props
 * @param emit
 * @returns
 */
export function useCheckbox(props: Readonly<CheckboxProps>, emit: CheckboxEmits) {
	const inputRef = ref<HTMLInputElement>();
	const generatedId = useId();
	const { group, checked, limitDisabled, optionValue, toggle } = useCheckboxModel(props, emit);

	const id = computed(() => props.id || `sy-checkbox-${generatedId}`);
	// 本地禁用、加载、Group 禁用和数量限制任一成立时都不可交互。
	const disabled = computed(() =>
		Boolean(props.disabled || props.loading || group?.disabled.value || limitDisabled.value),
	);
	const size = computed(() => group?.size.value || props.size || 'default');
	const name = computed(() => group?.name.value || props.name || undefined);

	// indeterminate 是 DOM 属性而不是普通 HTML attribute，必须同步到 input 实例。
	watchEffect(() => {
		if (inputRef.value) inputRef.value.indeterminate = Boolean(props.indeterminate);
	});

	const handleChange = () => {
		// 原生 input 只负责触发交互，实际值仍由受控模型更新。
		if (!disabled.value) toggle();
	};

	return { inputRef, id, checked, disabled, size, name, optionValue, handleChange };
}
