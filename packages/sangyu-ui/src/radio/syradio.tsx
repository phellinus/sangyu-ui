import { computed, defineComponent, mergeProps, type CSSProperties, type PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import { useFormItemContext } from '../form/composable/useFormItemContext';
import { mergeAriaIds, resolveAriaInvalid } from '../form/utils/aria';
import type { RadioProps, RadioShape, RadioSize, SyRadioInstance } from './Radio.type';
import { useRadio } from './composables';

export default defineComponent({
	name: 'SyRadio',
	/**
	 * 关闭默认属性继承
	 * 在渲染函数中明确绑定到 label 根节点
	 */
	inheritAttrs: false,
	props: {
		/** 独立使用时的选中状态 */
		modelValue: {
			type: Boolean,
			default: false,
		},
		/** 分组模式下的选项值 */
		label: {
			type: [String, Number, Boolean] as PropType<RadioProps['label']>,
			default: undefined,
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** Radio 图标形状 */
		shape: {
			type: String as PropType<RadioShape>,
			default: 'circle',
		},
		/** Radio 尺寸 */
		size: {
			type: String as PropType<RadioSize>,
			default: 'default',
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
		/** 默认插槽不存在时显示的内容 */
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
			type: Object as PropType<RadioProps['inputAttrs']>,
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { attrs, emit, expose, slots }) {
		const { c } = useClassnames('radio');
		/** 获取当前 Radio 所在的 FormItem 上下文 */
		const formItemContext = useFormItemContext();
		/** 合并 Radio 自身和 Form 的禁用状态 */
		const mergedDisabled = computed(() => {
			return Boolean(props.disabled || formItemContext?.disabled.value);
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
		const { inputRef, inputId, isInGroup, checked, disabled, size, name, handleChange, focus, blur } = useRadio(
			props,
			emit,
			mergedDisabled,
		);
		/** 根据当前状态生成类名 */
		const classes = computed(() => ({
			[c()]: true,
			[c(props.shape)]: true,
			[c(size.value)]: true,
			[c('checked')]: checked.value,
			[c('disabled')]: disabled.value,
			[c('grouped')]: isInGroup.value,
		}));

		/** 向外暴露聚焦和失焦方法 */
		expose<SyRadioInstance>({
			focus,
			blur,
		});

		return () => {
			/** 默认插槽优先级高于 content */
			const contentNode = slots.default ? slots.default() : props.content;

			/**
			 * 合并原生 input 属性
			 * 受控属性放在后面，防止 inputAttrs 覆盖组件状态
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
				'aria-label':
					props.inputAttrs?.['aria-label'] ??
					(!contentNode && props.label !== undefined ? String(props.label) : undefined),
				'aria-invalid': ariaInvalid.value,
				'aria-describedby': ariaDescribedby.value,
				onChange: handleChange,
			});

			/**
			 * 外部 class 和 style 与组件自身属性合并
			 */
			const rootProps = mergeProps(rootAttrs.value, {
				class: classes.value,
				style: props.customStyle,
			});

			return (
				<label {...rootProps}>
					<input {...nativeInputProps} />

					<span class={c('icon')} aria-hidden='true'>
						<span class={c('inner')} />
					</span>

					{contentNode !== undefined && contentNode !== '' && <span class={c('label')}>{contentNode}</span>}
				</label>
			);
		};
	},
});
