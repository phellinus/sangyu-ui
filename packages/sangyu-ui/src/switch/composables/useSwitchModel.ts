import { computed } from 'vue';
import { SwitchEmits, SwitchProps } from '../Switch.type';

export function useSwitchModel(props: Readonly<SwitchProps>, emit: SwitchEmits) {
	/** 选中态对应的值，未传时默认使用 true。 */
	const activeValue = computed(() => props.activeValue ?? true);
	/** 未选中态对应的值，未传时默认使用 false。 */
	const inactiveValue = computed(() => props.inactiveValue ?? false);

	/** 当前绑定值是否等于选中态值。 */
	const checked = computed(() => props.modelValue === activeValue.value);

	/**
	 * 归一化后的当前值。
	 *
	 * 当外部传入值既不是 activeValue，也不是 inactiveValue 时，
	 * 默认回退到 inactiveValue，避免组件进入不可识别状态。
	 */
	const normalizedValue = computed(() => {
		if (props.modelValue === activeValue.value || props.modelValue === inactiveValue.value) {
			return props.modelValue;
		}
		return inactiveValue.value;
	});

	/** 下一次切换后应该写回的值。 */
	const nextValue = computed(() => (checked.value ? inactiveValue.value : activeValue.value));

	/**
	 * 执行一次状态切换。
	 *
	 * 触发顺序：
	 * 1. update:modelValue
	 * 2. change
	 * 3. props.onChange
	 */
	const toggle = () => {
		const next = nextValue.value;
		const nextChecked = next === activeValue.value;

		emit('update:modelValue', next);
		emit('change', next, nextChecked);
		props.onChange?.(next, nextChecked);
	};
	return {
		activeValue,
		inactiveValue,
		checked,
		normalizedValue,
		nextValue,
		toggle,
	};
}
