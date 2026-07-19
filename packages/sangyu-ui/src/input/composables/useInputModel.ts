import { computed } from 'vue';
import type { InputEmits, InputProps } from '../Input.type';

export function useInputModel(props: Readonly<InputProps>, emit: InputEmits) {
	const value = computed(() => props.modelValue ?? '');

	const updateValue = (nextValue: string, nativeEvent: Event) => {
		if (nextValue === value.value) return;

		emit('update:modelValue', nextValue);
		emit('input', nextValue, nativeEvent);
	};

	const commitValue = (nextValue: string, nativeEvent: Event) => {
		emit('change', nextValue, nativeEvent);
	};

	return {
		value,
		updateValue,
		commitValue,
	};
}
