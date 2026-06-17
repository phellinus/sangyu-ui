import { computed, defineComponent, inject, PropType } from 'vue';
import { RadioButtonProps, radioGroupKey, RadioSize } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'SyRadioButton',
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		label: {
			type: [String, Number, Boolean] as PropType<RadioButtonProps['label']>,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String as PropType<RadioSize>,
			default: 'default',
		},
		name: {
			type: String,
			default: '',
		},
		content: {
			type: String,
			default: '',
		},
		customStyle: {
			type: String,
			default: '',
		},
		onChange: {
			type: Function as PropType<RadioButtonProps['onChange']>,
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { emit, slots }) {
		const groupContext = inject(radioGroupKey, null);
		const { c } = useClassnames('radio-button');

		const mergedDisabled = computed(() => props.disabled || !!groupContext?.disabled.value);
		const mergedSize = computed(() => groupContext?.size.value || props.size);
		const mergedName = computed(() => groupContext?.name.value || props.name);
		const checked = computed(() => {
			if (groupContext) {
				return groupContext.value.value === props.label;
			}
			return props.modelValue;
		});

		const handleChange = () => {
			if (mergedDisabled.value || checked.value) {
				return;
			}

			if (groupContext) {
				if (props.label === undefined) {
					return;
				}
				groupContext.onChange(props.label, { label: props.label });
				emit('change', props.label);
				return;
			}

			emit('update:modelValue', true);
			emit('change', true, props.label);
			props.onChange?.(true, props.label);
		};

		const buttonCls = computed(() => ({
			[c()]: true,
			[c(mergedSize.value)]: true,
			[c('checked')]: checked.value,
			[c('disabled')]: mergedDisabled.value,
		}));

		return () => {
			const contentNode = slots.default?.() ?? props.content;

			return (
				<label class={buttonCls.value} style={props.customStyle}>
					<input
						class={c('input')}
						type='radio'
						checked={checked.value}
						disabled={mergedDisabled.value}
						name={mergedName.value}
						onChange={handleChange}
					/>
					<span class={c('inner')}>
						{contentNode !== undefined && contentNode !== '' ? contentNode : props.label}
					</span>
				</label>
			);
		};
	},
});
