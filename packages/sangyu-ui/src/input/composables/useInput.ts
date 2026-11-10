import { computed, getCurrentInstance, nextTick, Ref, ref, useId, type CSSProperties } from 'vue';
import { getColor } from '@sangyu-ui/utils';
import type { InputEmits, InputNativeType, InputProps } from '../Input.type';
import { useInputModel } from './useInputModel';

export function useInput(props: Readonly<InputProps>, emit: InputEmits, disabled: Readonly<Ref<boolean>>) {
	const inputRef = ref<HTMLInputElement>();
	const instance = getCurrentInstance();
	const isExplicit = (key: string) => {
		const rawProps = instance?.vnode.props ?? {};
		return (
			Object.hasOwn(rawProps, key) ||
			Object.hasOwn(
				rawProps,
				key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
			)
		);
	};
	const focused = ref(false);
	/** 标记当前是否处于中文、日文等输入法的组合输入阶段。 */
	const isComposing = ref(false);
	const generatedId = useId();

	const { value, updateValue, commitValue } = useInputModel(props, emit);

	const inputId = computed(() => props.id || `sy-input-${generatedId}`);

	const hasValue = computed(() => value.value.length > 0);

	const isFloat = computed(() => focused.value || hasValue.value);
	// 是否显示清除按钮
	const showClear = computed(() => {
		return Boolean(props.clearable) && hasValue.value && !disabled.value && !props.readonly;
	});

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
		const result: Record<string, string | undefined> = {
			width: props.width,
			height: props.height,
		};
		// Default prop values remain public, while the Provider owns their visual defaults.
		if (props.textColor && (props.textColor !== 'black' || isExplicit('textColor')))
			result['--sy-input-text-color'] = getColor(props.textColor);
		if (props.bgColor && (props.bgColor !== '#f5f7f8' || isExplicit('bgColor')))
			result['--sy-input-bg'] = getColor(props.bgColor);
		if (props.borderColor && (props.borderColor !== 'rgba(0, 0, 0, 0.2)' || isExplicit('borderColor')))
			result['--border-color'] = getColor(props.borderColor);
		if (props.focusColor && (props.focusColor !== 'primary' || isExplicit('focusColor')))
			result['--focus-border-color'] = getColor(props.focusColor);
		if (props.labelColor && (props.labelColor !== 'primary' || isExplicit('labelColor')))
			result['--label-color'] = getColor(props.labelColor);
		if (props.lineColor && (props.lineColor !== '#f1f3f4' || isExplicit('lineColor')))
			result['--line-color'] = getColor(props.lineColor);
		if (props.focuLine && (props.focuLine !== 'primary' || isExplicit('focuLine')))
			result['--focu-line-color'] = getColor(props.focuLine);
		return result as CSSProperties;
	});

	const syncNativeValue = () => {
		if (!inputRef.value) return;

		if (inputRef.value.value !== value.value) {
			inputRef.value.value = value.value;
		}
	};

	const handleInput = (event: Event) => {
		if (disabled.value) return;
		// 组合输入期间不提交拼音等中间值。
		if (isComposing.value) return;

		const target = event.target as HTMLInputElement;

		updateValue(target.value, event);

		// 外部未接受 update:modelValue 时，恢复受控值。
		nextTick(syncNativeValue);
	};

	/**
	 * 开始组合输入时暂停模型同步。
	 */
	const handleCompositionStart = () => {
		isComposing.value = true;
	};

	/**
	 * 组合输入结束后提交最终文本。
	 */
	const handleCompositionEnd = (event: CompositionEvent) => {
		if (!isComposing.value) return;

		isComposing.value = false;
		handleInput(event);
	};

	const handleChange = (event: Event) => {
		if (disabled.value) return;
		const target = event.target as HTMLInputElement;
		commitValue(target.value, event);
	};

	const handleFocus = (event: FocusEvent) => {
		if (disabled.value) return;

		focused.value = true;
		emit('focus', event);
	};

	const handleBlur = (event: FocusEvent) => {
		focused.value = false;
		emit('blur', event);
	};

	const handleClear = (event: MouseEvent) => {
		if (disabled.value || props.readonly) return;

		updateValue('', event);
		commitValue('', event);
		emit('clear', event);

		nextTick(() => {
			syncNativeValue();
			inputRef.value?.focus();
		});
	};
	//让输入框获取焦点
	const focus = (): void => {
		if (disabled.value) {
			return;
		}
		inputRef.value?.focus();
	};
	const blur = () => inputRef.value?.blur();
	//选中输入框的文字
	const select = (): void => {
		if (disabled.value) {
			return;
		}
		inputRef.value?.select();
	};

	return {
		inputRef,
		inputId,
		value,
		focused,
		isFloat,
		showClear,
		inputType,
		ariaLabel,
		disabled,
		styles,
		handleInput,
		handleChange,
		handleCompositionStart,
		handleCompositionEnd,
		handleFocus,
		handleBlur,
		handleClear,
		focus,
		blur,
		select,
	};
}
