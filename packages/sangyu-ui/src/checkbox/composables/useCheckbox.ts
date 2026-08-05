import { computed, ref, useId, watchEffect, type Ref } from 'vue';
import { CheckboxEmits, CheckboxProps } from '../Checkbox.types';
import { useCheckboxModel } from './useCheckboxModel';

/**
 * 组合值模型、原生 input 状态以及从 Group 继承的公共属性。
 * @param props Checkbox 组件属性
 * @param emit Checkbox 组件事件派发器
 * @param mergedDisabled 合并 Checkbox 自身和 Form 后的禁用状态
 * @returns Checkbox 的值、原生属性和交互状态
 */
export function useCheckbox(
	props: Readonly<CheckboxProps>,
	emit: CheckboxEmits,
	mergedDisabled: Readonly<Ref<boolean>>,
) {
	const inputRef = ref<HTMLInputElement>();
	const generatedId = useId();
	const { group, checked, limitDisabled, optionValue, toggle } = useCheckboxModel(props, emit);

	const id = computed(() => props.id || `sy-checkbox-${generatedId}`);
	// 自身或 Form 禁用、加载、Group 禁用和数量限制任一成立时都不可交互
	const disabled = computed(() =>
		Boolean(mergedDisabled.value || props.loading || group?.disabled.value || limitDisabled.value),
	);
	const size = computed(() => group?.size.value || props.size || 'default');
	const name = computed(() => group?.name.value || props.name || undefined);

	// indeterminate 是 DOM 属性而不是普通 HTML attribute，必须同步到 input 实例。
	watchEffect(() => {
		if (inputRef.value) inputRef.value.indeterminate = Boolean(props.indeterminate);
	});

	const handleChange = (): void => {
		// 原生 input 只负责触发交互，实际值仍由受控模型更新。
		if (!disabled.value) toggle();
	};

	return { inputRef, id, checked, disabled, size, name, optionValue, handleChange };
}
