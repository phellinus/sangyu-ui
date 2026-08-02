import { CSSProperties, defineComponent, PropType } from 'vue';
import { FormLabelAlign, FormLayout, FormRules, FormScrollOptions, FormSize, ValidateTrigger } from './Form.type';
import { DEFAULT_FORM_LAYOUT, DEFAULT_FORM_SIZE, DEFAULT_LABEL_ALIGN } from './constants';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'SyForm',
	props: {
		model: {
			type: Object as PropType<Record<string, unknown>>,
			required: true,
		},
		rules: {
			type: Object as PropType<FormRules>,
			default: () => ({}),
		},
		layout: {
			type: String as PropType<FormLayout>,
			default: DEFAULT_FORM_LAYOUT,
		},
		labelAlign: {
			type: String as PropType<FormLabelAlign>,
			default: DEFAULT_LABEL_ALIGN,
		},
		labelWidth: [String, Number],
		disabled: Boolean,
		size: {
			type: String as PropType<FormSize>,
			default: DEFAULT_FORM_SIZE,
		},
		colon: {
			type: Boolean,
			default: true,
		},
		hideRequiredMark: Boolean,
		validateTrigger: {
			type: [String, Array] as PropType<ValidateTrigger | ValidateTrigger[]>,
			default: () => ['change', 'blur'],
		},
		validateOnRuleChange: {
			type: Boolean,
			default: true,
		},
		scrollToFirstError: {
			type: [Boolean, Object] as PropType<boolean | FormScrollOptions>,
			default: false,
		},
		customStyle: [String, Object] as PropType<string | CSSProperties>,
	},
	emits: ['submit', 'finish', 'finishFailed', 'validate'],
	setup(props, { slots, emit, expose }) {
		const { c } = useClassnames('form');

		return () => (
			<form
				class={{
					[c()]: true,
					[c(props.layout)]: true,
					[c(props.size)]: true,
					[c('disabled')]: props.disabled,
				}}
				style={props.customStyle}
			>
				{slots.default?.()}
			</form>
		);
	},
});
