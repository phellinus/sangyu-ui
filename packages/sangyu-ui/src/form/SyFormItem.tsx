import { CSSProperties, defineComponent, PropType } from 'vue';
import { FormRule, NamePath, ValidateStatus, ValidateTrigger } from './Form.type';

export default defineComponent({
	name: 'SyFormItem',
	props: {
		name: [String, Number, Array] as PropType<NamePath>,
		label: String,
		rules: [Object, Array] as PropType<FormRule | FormRule[]>,
		required: Boolean,
		validateTrigger: [String, Array] as PropType<ValidateTrigger | ValidateTrigger[]>,
		help: String,
		extra: String,
		validateStatus: String as PropType<ValidateStatus>,
		hasFeedback: Boolean,
		labelWidth: [String, Number],
		showLabel: {
			type: Boolean,
			default: true,
		},
		customStyle: [String, Object] as PropType<string | CSSProperties>,
	},
	setup(props, { slots }) {
		return () => {
			return slots.default?.();
		};
	},
});
