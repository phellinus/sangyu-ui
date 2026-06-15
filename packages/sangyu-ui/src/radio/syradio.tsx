import { computed, defineComponent, inject, PropType } from 'vue';
import { radioGroupKey, RadioProps, RadioShape, RadioSize } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'SyRadio',
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		label: {
			type: [String, Number, Boolean] as PropType<RadioProps['label']>,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		shape: {
			type: String as PropType<RadioShape>,
			default: 'circle',
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
			type: Function as PropType<RadioProps['onChange']>,
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { slots, emit }) {
		const groupContext = inject(radioGroupKey, null);
		const { c } = useClassnames('radio');

		const isInGroup = computed(() => !!groupContext);
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
			if (mergedDisabled.value) {
				return;
			}

			if (groupContext) {
				if (checked.value || props.label === undefined) {
					return;
				}
				groupContext.onChange(props.label, { label: props.label });
				return;
			}

			const next = true;
			if (props.modelValue === next) {
				return;
			}
			emit('update:modelValue', next);
			emit('change', next, props.label);
			props.onChange?.(next, props.label);
		};

		const radioCls = computed(() => ({
			[c()]: true,
			[c(props.shape)]: true,
			[c(mergedSize.value)]: true,
			[c('checked')]: checked.value,
			[c('disabled')]: mergedDisabled.value,
			[c('grouped')]: isInGroup.value,
		}));
		return () => {
			const contentNode = slots.default?.() ?? props.content;

			return (
				<>
					<label class={radioCls.value} style={props.customStyle}>
						<input
							class={c('input')}
							type='radio'
							checked={checked.value}
							disabled={mergedDisabled.value}
							name={mergedName.value}
							onChange={handleChange}
						/>
						<span class={c('icon')} aria-hidden='true'>
							<span class={c('inner')}></span>
						</span>
						{contentNode !== undefined && contentNode !== '' && (
							<span class={c('label')}>{contentNode}</span>
						)}
					</label>
				</>
			);
		};
	},
});
