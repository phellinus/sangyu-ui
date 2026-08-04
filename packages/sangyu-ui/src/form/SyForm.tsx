import { CSSProperties, defineComponent, PropType, provide } from 'vue';
import {
	FormContext,
	FormInstance,
	FormLabelAlign,
	FormLayout,
	FormRules,
	FormScrollOptions,
	FormSize,
	ValidateTrigger,
} from './Form.type';
import { DEFAULT_FORM_LAYOUT, DEFAULT_FORM_SIZE, DEFAULT_LABEL_ALIGN, FORM_CONTEXT_KEY } from './constants';
import { useClassnames } from '@sangyu-ui/utils';
import { mergeRules, useFormController } from './composable';

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
		const controller = useFormController(props);
		const context: FormContext = {
			props,
			...controller,
			getFieldRules(name, itemRules, required) {
				return mergeRules(props.rules, name, itemRules, required);
			},
			emitValidate(name, status, errors) {
				emit('validate', {
					name,
					status,
					errors,
				});
			},
		};
		provide(FORM_CONTEXT_KEY, context);
		expose<FormInstance>(controller);
		// 处理表单提交事件
		const handleSubmit = async (event: SubmitEvent) => {
			event.preventDefault();
			emit('submit', event);

			try {
				const values = await controller.validateFields();
				emit('finish', values);
			} catch (error: any) {
				emit('finishFailed', error);

				if (props.scrollToFirstError && error?.errorFields?.length) {
					const options = typeof props.scrollToFirstError === 'object' ? props.scrollToFirstError : undefined;

					controller.scrollToField(error.errorFields[0].name, options);
				}
			}
		};
		return () => (
			<form
				class={{
					[c()]: true,
					[c(props.layout)]: true,
					[c(props.size)]: true,
					[c('disabled')]: props.disabled,
				}}
				style={props.customStyle}
				onSubmit={handleSubmit}
				novalidate
			>
				{slots.default?.()}
			</form>
		);
	},
});
