import { computed, defineComponent, mergeProps, type CSSProperties, type PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { RadioGroupDirection, RadioGroupProps, RadioSize } from './Radio.type';
import { useRadioGroup } from './composables';

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
			default: 'default',
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
		/** 创建并提供 RadioGroup 上下文 */
		useRadioGroup(props, emit);
		/** 根据方向、尺寸和禁用状态生成类名 */
		const classes = computed(() => ({
			[c()]: true,
			[c(props.direction)]: true,
			[c(props.size)]: true,
			[c('disabled')]: props.disabled,
		}));

		return () => {
			/** 合并分组根节点属性 */
			const rootProps = mergeProps(attrs, {
				class: classes.value,
				style: props.customStyle,
				role: 'radiogroup',
				'aria-disabled': props.disabled ? 'true' : undefined,
			});
			return <div {...rootProps}>{slots.default?.()}</div>;
		};
	},
});
