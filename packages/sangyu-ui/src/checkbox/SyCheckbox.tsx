import { computed, CSSProperties, defineComponent, PropType } from 'vue';
import {
	CheckboxEmits,
	CheckboxLabelPosition,
	CheckboxModelValue,
	CheckboxProps,
	CheckboxSize,
	CheckboxValue,
} from './Checkbox.types';
import { useClassnames } from '@sangyu-ui/utils';
import { useCheckbox } from './composables';

export default defineComponent({
	name: 'SyCheckbox',
	inheritAttrs: false,
	props: {
		// 独立使用或直接绑定数组时的受控值。
		modelValue: { type: [String, Number, Boolean, Object, Array] as PropType<CheckboxModelValue>, default: false },
		// 当前选项在 SyCheckboxGroup 中的唯一值。
		value: { type: [String, Number, Boolean, Object] as PropType<CheckboxValue>, default: true },
		// 独立使用时，选中和未选中分别提交的值。
		trueValue: { type: [String, Number, Boolean, Object] as PropType<CheckboxValue>, default: true },
		falseValue: { type: [String, Number, Boolean, Object] as PropType<CheckboxValue>, default: false },
		// 半选状态由外部控制，本身不会修改 modelValue。
		indeterminate: Boolean,
		// loading 同时视为禁用，避免异步处理中再次改变值。
		disabled: Boolean,
		loading: Boolean,
		// 嵌套在 Group 中时，Group 尺寸覆盖本地尺寸。
		size: { type: String as PropType<CheckboxSize>, default: 'default' },
		// 标签内容优先级：默认插槽、content、label。
		label: String,
		content: String,
		// 只调整视觉顺序，不改变 label 与 input 的语义关联。
		labelPosition: { type: String as PropType<CheckboxLabelPosition>, default: 'after' },
		lineThrough: Boolean,
		// 原生表单属性。
		name: String,
		id: String,
		// 可选视觉覆盖项。
		color: String,
		customStyle: { type: [String, Object] as PropType<string | CSSProperties> },
		// 除 Vue change 事件外，额外提供适合 JSX 调用的回调属性。
		onChange: Function as PropType<CheckboxProps['onChange']>,
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { attrs, emit, slots }) {
		const { c } = useClassnames('checkbox');
		const state = useCheckbox(props, emit as CheckboxEmits);

		const classes = computed(() => ({
			[c()]: true,
			[c(state.size.value)]: true,
			[c('checked')]: state.checked.value,
			[c('indeterminate')]: props.indeterminate,
			[c('disabled')]: state.disabled.value,
			[c('loading')]: props.loading,
			[c('label-before')]: props.labelPosition === 'before',
			[c('line-through')]: props.lineThrough && state.checked.value,
		}));
		const styles = computed(() => [
			props.customStyle,
			props.color ? ({ '--sy-checkbox-color': props.color } as CSSProperties) : undefined,
		]);
		return () => {
			// 默认插槽优先，避免属性文本覆盖用户传入的富内容。
			const label = slots.default?.() ?? props.content ?? props.label;
			return (
				<label class={classes.value} style={styles.value}>
					<input
						{...attrs}
						ref={state.inputRef}
						id={state.id.value}
						class={c('input')}
						type='checkbox'
						name={state.name.value}
						value={
							typeof state.optionValue.value === 'object' ? undefined : String(state.optionValue.value)
						}
						checked={state.checked.value}
						disabled={state.disabled.value}
						aria-checked={props.indeterminate ? 'mixed' : state.checked.value}
						onChange={state.handleChange}
					/>
					<span class={c('control')} aria-hidden='true'>
						{props.loading ? (
							<span class={c('spinner')} />
						) : slots.icon ? (
							slots.icon({ checked: state.checked.value, indeterminate: props.indeterminate })
						) : (
							<span class={c(props.indeterminate ? 'mixed-mark' : 'check-mark')} />
						)}
					</span>
					{label !== undefined && label !== '' && <span class={c('label')}>{label}</span>}
				</label>
			);
		};
	},
});
