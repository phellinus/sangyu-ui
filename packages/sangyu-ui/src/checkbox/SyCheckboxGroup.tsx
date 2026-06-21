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
		size: { type: String as PropType<CheckboxSize>, default: 'default' },
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
		useCheckboxGroup(props, emit as CheckboxGroupEmits);
		const classes = computed(() => ({
			[c()]: true,
			[c(props.direction)]: true,
			[c(props.size)]: true,
			[c('disabled')]: props.disabled,
		}));

		return () => (
			<div class={classes.value} style={props.customStyle} role='group'>
				{slots.default?.()}
			</div>
		);
	},
});
