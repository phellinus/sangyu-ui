import { computed, defineComponent, mergeProps, type CSSProperties, type PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import { useFormItemContext } from '../form/composable/useFormItemContext';
import { mergeAriaIds, resolveAriaInvalid } from '../form/utils/aria';
import type { RadioButtonProps, RadioSize, SyRadioInstance } from './Radio.type';
import { useRadio } from './composables';

export default defineComponent({
	name: 'SyRadioButton',
	inheritAttrs: false,
	props: {
		/** 独立使用时的选中状态 */
		modelValue: {
			type: Boolean,
			default: false,
		},
		/** 分组模式下绑定的选项值 */
		label: {
			type: [String, Number, Boolean] as PropType<RadioButtonProps['label']>,
			default: undefined,
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 按钮尺寸 */
		size: {
			type: String as PropType<RadioSize>,
		},
		/** 原生 Radio 名称 */
		name: {
			type: String,
			default: '',
		},

		/** 原生 Radio id */
		id: {
			type: String,
			default: '',
		},

		/** 没有默认插槽时显示的内容 */
		content: {
			type: String,
			default: '',
		},

		/** 根节点自定义样式 */
		customStyle: {
			type: [String, Object] as PropType<string | CSSProperties>,
		},

		/** 传递给真实 input 的额外属性 */
		inputAttrs: {
			type: Object as PropType<RadioButtonProps['inputAttrs']>,
		},
	},

	emits: ['update:modelValue', 'change'],

	setup(props, { attrs, emit, expose, slots }) {
		const { c } = useClassnames('radio-button');
		/** 获取当前 RadioButton 所在的 FormItem 上下文 */
		const formItemContext = useFormItemContext();
		/** 合并 RadioButton 自身和 Form 的禁用状态 */
		const mergedDisabled = computed(() => {
			return Boolean(props.disabled || formItemContext?.disabled.value);
		});
		/** RadioButton 最终使用的尺寸 */
		const mergedSize = computed<RadioSize>(() => {
			return props.size || formItemContext?.size.value || 'default';
		});
		/** 根节点需要保留的透传属性 */
		const rootAttrs = computed(() => {
			return Object.fromEntries(
				Object.entries(attrs).filter(([key]) => key !== 'aria-invalid' && key !== 'aria-describedby'),
			);
		});
		/** 真实 input 最终使用的 aria-invalid */
		const ariaInvalid = computed(() => {
			const attrValue = resolveAriaInvalid(attrs['aria-invalid'], formItemContext?.ariaInvalid.value);

			return resolveAriaInvalid(props.inputAttrs?.['aria-invalid'], attrValue);
		});
		/** 真实 input 最终使用的 aria-describedby */
		const ariaDescribedby = computed(() => {
			return mergeAriaIds(
				attrs['aria-describedby'],
				props.inputAttrs?.['aria-describedby'],
				formItemContext?.ariaDescribedby.value,
			);
		});

		const { inputRef, inputId, checked, disabled, size, name, handleChange, focus, blur } = useRadio(
			props,
			emit,
			mergedDisabled,
			mergedSize,
		);

		/** 根据选中、禁用和尺寸状态生成类名 */
		const classes = computed(() => ({
			[c()]: true,
			[c(size.value)]: true,
			[c('checked')]: checked.value,
			[c('disabled')]: disabled.value,
		}));

		/** 暴露原生 Radio 控制方法 */
		expose<SyRadioInstance>({
			focus,
			blur,
		});

		return () => {
			/**
			 * 内容优先级：
			 * 1. 默认插槽
			 * 2. content
			 * 3. label
			 */
			const contentNode = slots.default
				? slots.default()
				: props.content || (props.label !== undefined ? String(props.label) : '');

			/**
			 * 合并原生 Radio 属性
			 */
			const nativeInputProps = mergeProps(props.inputAttrs ?? {}, {
				id: inputId.value,
				ref: inputRef,
				class: c('input'),
				type: 'radio',
				value: props.label === undefined ? undefined : String(props.label),
				checked: checked.value,
				disabled: disabled.value,
				name: name.value,
				'aria-invalid': ariaInvalid.value,
				'aria-describedby': ariaDescribedby.value,
				onChange: handleChange,
			});

			/**
			 * 合并根节点属性。
			 */
			const rootProps = mergeProps(rootAttrs.value, {
				class: classes.value,
				style: props.customStyle,
			});

			return (
				<label {...rootProps}>
					<input {...nativeInputProps} />
					<span class={c('inner')}>{contentNode}</span>
				</label>
			);
		};
	},
});
