import { computed, CSSProperties, defineComponent, PropType, provide, ref } from 'vue';
import { FormItemProps, FormRule, NamePath, ValidateStatus, ValidateTrigger } from './Form.type';
import { useClassnames } from '@sangyu-ui/utils';
import { useFormItem } from './composable';
import { FORM_ITEM_CONTEXT_KEY } from './constants';

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
		const { c, ce } = useClassnames('form-item');
		const rootRef = ref<HTMLElement>();
		// 当前字段的校验状态和错误信息
		const field = useFormItem(props as FormItemProps, rootRef);
		// 当前字段的校验状态
		const status = computed(() => props.validateStatus || field.validateStatus.value);
		//字段的帮助信息
		const messages = computed(() => (props.help ? [props.help] : field.errors.value));
		// 当前字段是否为必填字段
		const required = computed(() => {
			if (props.required) return true;
			return field.form?.getFieldRules(props.name!, props.rules).some((rule) => rule.required);
		});
		//字段标签宽度
		const labelWidth = computed(() => {
			const value = props.labelWidth ?? field.form?.props.labelWidth;
			if (typeof value === 'number') return `${value}px`;
			return value;
		});
		//消息id
		const messageId = computed(() =>
			props.name == null ? undefined : `sy-form-item-${String(props.name).replace(/\W/g, '-')}`,
		);
		provide(FORM_ITEM_CONTEXT_KEY, {
			name: props.name == null ? undefined : Array.isArray(props.name) ? props.name : [props.name],
			validateStatus: field.validateStatus,
			errors: field.errors,
			onChange: field.onChange,
			onBlur: field.onBlur,
		});
		// 处理表单字段的输入、变更和失焦事件
		const handleInput = () => field.onChange();
		const handleChange = () => field.onChange();
		const handleFocusout = () => field.onBlur();
		return () => (
			<div
				ref={rootRef}
				class={{
					[c()]: true,
					[c(status.value)]: Boolean(status.value),
					[c('required')]: required.value,
				}}
				style={props.customStyle}
				onInput={handleInput}
				onChange={handleChange}
				onFocusout={handleFocusout}
			>
				{props.showLabel && (props.label || slots.label) && (
					<label
						class={c(ce('label'))}
						style={{
							width: labelWidth.value,
							textAlign: field.form?.props.labelAlign || 'right',
						}}
					>
						{required.value && !field.form?.props.hideRequiredMark && (
							<span class={c('required-mark')} aria-hidden='true'>
								*
							</span>
						)}

						{slots.label?.() || props.label}

						{field.form?.props.colon && field.form.props.layout === 'horizontal' && '：'}
					</label>
				)}

				<div class={c(ce('control'))}>
					<div
						class={c(ce('control-input'))}
						aria-invalid={status.value === 'error'}
						aria-describedby={messageId.value}
					>
						{slots.default?.()}
					</div>

					{messages.value.length > 0 && (
						<div id={messageId.value} class={c(ce('message'))} aria-live='polite'>
							{slots.help?.() || messages.value[0]}
						</div>
					)}

					{(props.extra || slots.extra) && <div class={c(ce('extra'))}>{slots.extra?.() || props.extra}</div>}
				</div>
			</div>
		);
	},
});
