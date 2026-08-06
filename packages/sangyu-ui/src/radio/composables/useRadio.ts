import { computed, inject, ref, useId, type Ref } from 'vue';
import type { RadioButtonProps, RadioEmits, RadioProps, RadioSize } from '../Radio.type';
import { radioGroupKey } from '../context';

/**
 * Radio 和 RadioButton 共用逻辑
 * @param props Radio 或 RadioButton 组件属性
 * @param emit Radio 组件事件派发器
 * @param mergedDisabled 合并组件自身和 Form 后的禁用状态
 * @param mergedSize 合并组件自身和 Form 后的尺寸
 * @returns Radio 的模型、原生属性和交互状态
 */
export function useRadio(
	props: Readonly<RadioProps | RadioButtonProps>,
	emit: RadioEmits,
	mergedDisabled: Readonly<Ref<boolean>>,
	mergedSize: Readonly<Ref<RadioSize>>,
) {
	/** 获取可能存在的 RadioGroup */
	const groupContext = inject(radioGroupKey, null);

	/** 保存真实 input 引用 */
	const inputRef = ref<HTMLInputElement>();

	/** 为独立 Radio 生成稳定 id */
	const generatedId = useId();

	/** 原生 input 最终使用的 id */
	const inputId = computed(() => {
		return props.id || `sy-radio-${generatedId}`;
	});

	/** 是否处于 RadioGroup 中 */
	const isInGroup = computed(() => {
		return Boolean(groupContext);
	});

	/**
	 * 计算最终选中状态
	 * 分组内比较 Group modelValue 和当前 label
	 * 独立使用时读取自身 modelValue
	 */
	const checked = computed(() => {
		if (groupContext) {
			return Object.is(groupContext.modelValue.value, props.label);
		}

		return Boolean(props.modelValue);
	});

	/** 组件、Form 和 RadioGroup 任一禁用时当前选项都不可用 */
	const disabled = computed(() => {
		return Boolean(mergedDisabled.value || groupContext?.disabled.value);
	});

	/** 分组尺寸优先级高于子项尺寸 */
	const size = computed(() => {
		return groupContext?.size.value || mergedSize.value;
	});

	/** 分组名称优先级高于子项名称 */
	const name = computed(() => {
		return groupContext?.name.value || props.name || '';
	});

	/** 原生 Radio change 事件入口 */
	const handleChange = (nativeEvent: Event): void => {
		if (disabled.value || checked.value) return;

		/**
		 * 分组模式必须提供 label，
		 * 否则 Group 无法确定应该写入哪个值
		 */
		if (groupContext) {
			if (props.label === undefined) return;

			groupContext.select(props.label, nativeEvent);

			/**
			 * 子 Radio 仍然抛出自身 change，
			 * 方便监听某一个具体选项
			 */
			emit('change', true, props.label, nativeEvent);
			return;
		}

		/**
		 * 独立 Radio 只能从未选中变为选中，
		 * 再次点击不会像 Checkbox 一样取消选择
		 */
		emit('update:modelValue', true);
		emit('change', true, props.label, nativeEvent);
	};

	/** 聚焦原生 input */
	const focus = (): void => {
		if (disabled.value) return;

		inputRef.value?.focus();
	};

	/** 让原生 input 失焦 */
	const blur = (): void => {
		inputRef.value?.blur();
	};

	return {
		inputRef,
		inputId,
		isInGroup,
		checked,
		disabled,
		size,
		name,
		handleChange,
		focus,
		blur,
	};
}
