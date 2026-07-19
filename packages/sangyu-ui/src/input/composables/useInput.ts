import { computed, nextTick, ref, useId, type CSSProperties } from 'vue';
import { getColor } from '@sangyu-ui/utils';
import type { InputEmits, InputNativeType, InputProps } from '../Input.type';
import { useInputModel } from './useInputModel';

export function useInput(props: Readonly<InputProps>, emit: InputEmits) {
	const inputRef = ref<HTMLInputElement>();
	const focused = ref(false);
	const generatedId = useId();

	const { value, updateValue, commitValue } = useInputModel(props, emit);

	const inputId = computed(() => props.id || `sy-input-${generatedId}`);

	const hasValue = computed(() => value.value.length > 0);

	const isFloat = computed(() => focused.value || hasValue.value);

	const showClear = computed(() => Boolean(props.clearable) && hasValue.value && !props.disabled && !props.readonly);

	const inputType = computed<InputNativeType>(() => {
		const isPassword = props.password || props.nativeType === 'password';

		if (!isPassword) {
			return props.nativeType || 'text';
		}

		return props.showPassword ? 'text' : 'password';
	});

	const ariaLabel = computed(() => {
		return props.inputAttrs?.['aria-label'] || props.label || props.placeholder;
	});

	const styles = computed<CSSProperties>(() => {
		return {
			width: props.width,
			height: props.height,
			color: getColor(props.textColor),
			backgroundColor: getColor(props.bgColor),

			'--sy-input-bg': getColor(props.bgColor),
			'--border-color': getColor(props.borderColor),
			'--focus-border-color': getColor(props.focusColor),
			'--label-color': getColor(props.labelColor),
			'--line-color': getColor(props.lineColor),
			'--focu-line-color': getColor(props.focuLine),
		} as CSSProperties;
	});

	const syncNativeValue = () => {
		if (!inputRef.value) return;

		if (inputRef.value.value !== value.value) {
			inputRef.value.value = value.value;
		}
	};

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;

		updateValue(target.value, event);

		// 外部未接受 update:modelValue 时，恢复受控值。
		nextTick(syncNativeValue);
	};

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		commitValue(target.value, event);
	};

	const handleFocus = (event: FocusEvent) => {
		if (props.disabled) return;

		focused.value = true;
		emit('focus', event);
	};

	const handleBlur = (event: FocusEvent) => {
		focused.value = false;
		emit('blur', event);
	};

	const handleClear = (event: MouseEvent) => {
		if (props.disabled || props.readonly) return;

		updateValue('', event);
		commitValue('', event);
		emit('clear', event);

		nextTick(() => {
			syncNativeValue();
			inputRef.value?.focus();
		});
	};

	const focus = () => inputRef.value?.focus();
	const blur = () => inputRef.value?.blur();
	const select = () => inputRef.value?.select();

	return {
		inputRef,
		inputId,
		value,
		focused,
		isFloat,
		showClear,
		inputType,
		ariaLabel,
		styles,
		handleInput,
		handleChange,
		handleFocus,
		handleBlur,
		handleClear,
		focus,
		blur,
		select,
	};
}
