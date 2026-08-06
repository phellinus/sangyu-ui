import { computed, defineComponent, type CSSProperties, type PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type {
	CheckboxDirection,
	CheckboxGroupEmits,
	CheckboxGroupProps,
	CheckboxSize,
	CheckboxValue,
} from './Checkbox.types';
import { useCheckboxGroup } from './composables';
import { useFormItemContext } from '../form/composable/useFormItemContext';

export default defineComponent({
	name: 'SyCheckboxGroup',
	props: {
		// 完整的受控已选值数组，内部不会原地修改。
		modelValue: { type: Array as PropType<CheckboxValue[]>, default: () => [] },
		// 组内所有子 Checkbox 继承的禁用状态。
		disabled: Boolean,
		// 选择数量边界；达到边界后只禁用会违反限制的操作。
		min: Number,
		max: Number,
		// 子 Checkbox 继承的 Group 展示配置。
		size: String as PropType<CheckboxSize>,
		direction: { type: String as PropType<CheckboxDirection>, default: 'horizontal' },
		// 子 input 继承的原生 name。
		name: { type: String, default: '' },
		customStyle: { type: [String, Object] as PropType<string | CSSProperties> },
		// 除 Vue change 事件外，额外提供适合 JSX 调用的回调属性。
		onChange: Function as PropType<CheckboxGroupProps['onChange']>,
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { emit, slots }) {
		const { c } = useClassnames('checkbox-group');
		const formItemContext = useFormItemContext();
		// CheckboxGroup 最终使用的禁用状态
		const mergedDisabled = computed(() => {
			return Boolean(props.disabled || formItemContext?.disabled.value);
		});
		// CheckboxGroup 最终使用的尺寸
		const mergedSize = computed<CheckboxSize>(() => {
			return props.size || formItemContext?.size.value || 'default';
		});
		useCheckboxGroup(props, emit as CheckboxGroupEmits, mergedDisabled, mergedSize);
		const classes = computed(() => ({
			[c()]: true,
			[c(props.direction)]: true,
			[c(mergedSize.value)]: true,
			[c('disabled')]: mergedDisabled.value,
		}));

		return () => (
			<div
				class={classes.value}
				style={props.customStyle}
				role='group'
				aria-disabled={mergedDisabled.value ? 'true' : undefined}
			>
				{slots.default?.()}
			</div>
		);
	},
});
