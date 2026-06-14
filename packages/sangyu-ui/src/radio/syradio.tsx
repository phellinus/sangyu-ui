import { defineComponent, PropType } from 'vue';
import { RadioProps, RadioShape, RadioSize } from './interface';

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
	emits: {
		'update:modelValue': (val: string | number | boolean) => true,
		change: (val: string | number | boolean) => true,
	},
	setup(props, { slots }) {
		return () => {
			return (
				<>
					<label>123</label>
				</>
			);
		};
	},
});
