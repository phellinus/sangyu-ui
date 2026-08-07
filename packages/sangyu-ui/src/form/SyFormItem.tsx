import { computed, CSSProperties, defineComponent, PropType, provide, ref, useId } from 'vue';
import { FormItemProps, FormRule, FormSize, NamePath, ValidateStatus, ValidateTrigger } from './Form.type';
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
		const { c, ce, cm } = useClassnames('form-item');
		const rootRef = ref<HTMLElement>();
		// 当前字段的校验状态和错误信息
		const field = useFormItem(props as FormItemProps, rootRef);
		// 当前字段的校验状态
		const status = computed(() => props.validateStatus || field.validateStatus.value);
		// 当前字段展示的校验信息
		const messages = computed(() => {
			if (props.help) return [props.help];
			if (field.errors.value.length) return field.errors.value;

			return field.warnings.value;
		});
		// 当前字段是否为必填字段
		const required = computed(() => {
			if (props.required) return true;
			if (props.name == null) return false;

			return Boolean(field.form?.getFieldRules(props.name, props.rules).some((rule) => rule.required));
		});
		//字段标签宽度
		const labelWidth = computed(() => {
			const value = props.labelWidth ?? field.form?.props.labelWidth;
			if (typeof value === 'number') return `${value}px`;
			return value;
		});
		// 当前 FormItem 从 SyForm 继承的禁用状态
		const disabled = computed(() => {
			return Boolean(field.form?.props.disabled);
		});
		// 当前 FormItem 从 SyForm 继承的尺寸
		const size = computed<FormSize>(() => {
			return field.form?.props.size ?? 'default';
		});
		// 当前字段的反馈图标内容
		const feedbackContent = computed(() => {
			if (status.value === 'success') return '✓';
			if (status.value === 'warning') return '!';
			if (status.value === 'error') return '×';
			if (status.value === 'validating') return '…';

			return '';
		});
		// 生成当前 FormItem 唯一标识
		const generatedId = useId();
		// 校验消息元素 id
		const messageId = `sy-form-item-${generatedId}-message`;
		// 当前字段是否处于错误状态
		const ariaInvalid = computed<boolean | undefined>(() => {
			return status.value === 'error' ? true : undefined;
		});
		// 当前字段描述信息对应的元素 id
		const ariaDescribedby = computed<string | undefined>(() => {
			return messages.value.length > 0 || slots.help ? messageId : undefined;
		});
		provide(FORM_ITEM_CONTEXT_KEY, {
			name: props.name == null ? undefined : Array.isArray(props.name) ? props.name : [props.name],
			disabled,
			size,
			ariaInvalid,
			ariaDescribedby,
			validateStatus: field.validateStatus,
			errors: field.errors,
			warnings: field.warnings,
			onChange: field.onChange,
			onBlur: field.onBlur,
		});
		// 处理表单字段的输入、变更和失焦事件
		const handleInput = (): void => {
			if (disabled.value) {
				return;
			}
			field.onChange();
		};

		//处理表单字段 change 事件
		const handleChange = (): void => {
			if (disabled.value) {
				return;
			}
			field.onChange();
		};

		// 处理表单字段失焦事件
		const handleFocusout = (): void => {
			if (disabled.value) {
				return;
			}
			field.onBlur();
		};
		return () => (
			<div
				ref={rootRef}
				class={{
					[c()]: true,
					[c(cm(status.value))]: Boolean(status.value),
					[c(cm('required'))]: required.value,
					[c(cm('has-feedback'))]: props.hasFeedback,
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
							<span class={c(ce('required-mark'))} aria-hidden='true'>
								*
							</span>
						)}

						{slots.label?.() || props.label}

						{field.form?.props.colon && field.form.props.layout === 'horizontal' && '：'}
					</label>
				)}

				<div class={c(ce('control'))}>
					<div class={c(ce('control-input'))}>
						{slots.default?.()}
						{props.hasFeedback && feedbackContent.value && (
							<span class={[c(ce('feedback')), c(ce('feedback'), cm(status.value))]} aria-hidden='true'>
								{feedbackContent.value}
							</span>
						)}
					</div>

					{(messages.value.length > 0 || slots.help) && (
						<div id={messageId} class={c(ce('message'))} aria-live='polite'>
							{slots.help?.() || messages.value[0]}
						</div>
					)}

					{(props.extra || slots.extra) && <div class={c(ce('extra'))}>{slots.extra?.() || props.extra}</div>}
				</div>
			</div>
		);
	},
});
