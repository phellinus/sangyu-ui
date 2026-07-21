import { computed, provide, useId } from 'vue';
import type { RadioGroupEmits, RadioGroupProps, RadioOptionInfo, RadioSize } from '../Radio.type';
import { radioGroupKey } from '../context';

/**
 * 管理 RadioGroup 状态并向子选项提供上下文
 */
export function useRadioGroup(props: Readonly<RadioGroupProps>, emit: RadioGroupEmits) {
	/**
	 * 生成分组唯一名称。
	 * 同一个 Group 内的原生 Radio 必须拥有相同 name
	 * 才能获得正确的原生单选和方向键行为
	 */
	const generatedName = useId();

	/** 分组当前值 */
	const modelValue = computed(() => props.modelValue);

	/** 分组最终禁用状态 */
	const disabled = computed(() => Boolean(props.disabled));

	/** 分组最终尺寸 */
	const size = computed<RadioSize>(() => {
		return props.size || 'default';
	});

	/** 未传 name 时生成一个仅属于当前 Group 的名称 */
	const name = computed(() => {
		return props.name || `sy-radio-group-${generatedName}`;
	});

	/** 选择一个 Radio 选项 */
	const select = (value: string | number | boolean, nativeEvent: Event) => {
		if (disabled.value) return;
		if (Object.is(props.modelValue, value)) return;

		const option: RadioOptionInfo = {
			label: value,
		};

		/**
		 * 事件触发顺序：
		 * 1. update:modelValue
		 * 2. change
		 */
		emit('update:modelValue', value);
		emit('change', value, option, nativeEvent);
	};

	/** 向 SyRadio 和 SyRadioButton 提供分组状态 */
	provide(radioGroupKey, {
		modelValue,
		disabled,
		name,
		size,
		select,
	});

	return {
		modelValue,
		disabled,
		size,
		name,
		select,
	};
}
