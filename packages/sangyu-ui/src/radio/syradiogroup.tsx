import { computed, defineComponent, mergeProps, type CSSProperties, type PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { RadioGroupDirection, RadioGroupProps, RadioSize } from './Radio.type';
import { useRadioGroup } from './composables';
import { useFormItemContext } from '../form/composable/useFormItemContext';

export default defineComponent({
	name: 'SyRadioGroup',
	inheritAttrs: false,
	props: {
		/** 当前选中的 label */
		modelValue: {
			type: [String, Number, Boolean] as PropType<RadioGroupProps['modelValue']>,
			default: undefined,
		},
		/** 是否禁用整个分组 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 分组原生名称 */
		name: {
			type: String,
			default: '',
		},
		/** 分组统一尺寸 */
		size: {
			type: String as PropType<RadioSize>,
		},
		/** 分组排列方向 */
		direction: {
			type: String as PropType<RadioGroupDirection>,
			default: 'horizontal',
		},
		/** 分组根节点自定义样式 */
		customStyle: {
			type: [String, Object] as PropType<string | CSSProperties>,
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { attrs, emit, slots }) {
		const { c } = useClassnames('radio-group');
		const formItemContext = useFormItemContext();
		/** RadioGroup 最终使用的禁用状态 */
		const mergedDisabled = computed(() => {
			return Boolean(props.disabled || formItemContext?.disabled.value);
		});
		/** RadioGroup 最终使用的尺寸 */
		const mergedSize = computed<RadioSize>(() => {
			return props.size || formItemContext?.size.value || 'default';
		});
		/** 创建并提供 RadioGroup 上下文 */
		useRadioGroup(props, emit, mergedDisabled, mergedSize);
		/** 根据方向、尺寸和禁用状态生成类名 */
		const classes = computed(() => ({
			[c()]: true,
			[c(props.direction)]: true,
			[c(mergedSize.value)]: true,
			[c('disabled')]: mergedDisabled.value,
		}));

		return () => {
			/** 合并分组根节点属性 */
			const rootProps = mergeProps(attrs, {
				class: classes.value,
				style: props.customStyle,
				role: 'radiogroup',
				'aria-disabled': mergedDisabled.value ? 'true' : undefined,
			});
			return <div {...rootProps}>{slots.default?.()}</div>;
		};
	},
});
