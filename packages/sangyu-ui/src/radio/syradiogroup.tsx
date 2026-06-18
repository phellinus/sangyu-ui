import { computed, defineComponent, PropType, provide, toRef } from 'vue';
import { RadioGroupDirection, radioGroupKey, RadioGroupProps, RadioSize } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'SyRadioGroup',
	props: {
		modelValue: {
			type: [String, Number, Boolean] as PropType<RadioGroupProps['modelValue']>,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			default: '',
		},
		size: {
			type: String as PropType<RadioSize>,
			default: 'default',
		},
		direction: {
			type: String as PropType<RadioGroupDirection>,
			default: 'horizontal',
		},
		customStyle: {
			type: String,
			default: '',
		},
		onChange: {
			type: Function as PropType<RadioGroupProps['onChange']>,
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { emit, slots }) {
		const { c } = useClassnames('radio-group');

		const handleChange = (value: string | number | boolean, option: { label: string | number | boolean }) => {
			if (props.modelValue === value) {
				return;
			}
			emit('update:modelValue', value);
			emit('change', value, option);
			props.onChange?.(value, option);
		};

		provide(radioGroupKey, {
			value: toRef(props, 'modelValue'),
			disabled: toRef(props, 'disabled'),
			name: toRef(props, 'name'),
			size: toRef(props, 'size'),
			direction: toRef(props, 'direction'),
			onChange: handleChange,
		});

		const groupCls = computed(() => ({
			[c()]: true,
			[c(props.direction)]: true,
			[c(props.size)]: true,
			[c('disabled')]: props.disabled,
		}));

		return () => {
			<div class={groupCls.value} style={props.customStyle} role='radiogroup'>
				{slots.default?.()}
			</div>;
		};
	},
});
