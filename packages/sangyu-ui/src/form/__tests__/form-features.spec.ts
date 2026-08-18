import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import SyCheckbox from '../../checkbox/SyCheckbox';
import SyCheckboxGroup from '../../checkbox/SyCheckboxGroup';
import SyInput from '../../input/SyInput.vue';
import SyRadio from '../../radio/syradio';
import SyRadioButton from '../../radio/syradiobutton';
import SyRadioGroup from '../../radio/syradiogroup';
import SySelect from '../../select/SySelect';
import SySwitch from '../../switch/SySwitch.vue';
import SyForm from '../SyForm';
import SyFormItem from '../SyFormItem';
import type { FormInstance, FormRules } from '../Form.type';

/**
 * 获取 SyForm 暴露的实例
 * @param wrapper 表单测试组件
 * @returns 表单实例
 */
function getFormInstance(wrapper: ReturnType<typeof mount>): FormInstance {
	return wrapper.getComponent(SyForm).getCurrentComponent().exposed as FormInstance;
}

describe('SyForm complete features', () => {
	it('uses Form and FormItem validateTrigger with the correct priority', async () => {
		const model = reactive({
			formTrigger: 'valid',
			itemTrigger: 'valid',
			ruleTrigger: 'valid',
		});
		const rules: FormRules = {
			formTrigger: {
				min: 3,
				message: 'Form 字段长度不足',
			},
			itemTrigger: {
				min: 3,
				message: 'FormItem 字段长度不足',
			},
			ruleTrigger: {
				min: 3,
				message: 'Rule 字段长度不足',
				trigger: 'change',
			},
		};
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyInput,
				},

				/**
				 * 提供测试所需的表单模型和校验规则
				 */
				setup() {
					return {
						model,
						rules,
					};
				},

				template: `
					<SyForm :model="model" :rules="rules" validate-trigger="blur">
						<SyFormItem name="formTrigger">
							<SyInput v-model="model.formTrigger" />
						</SyFormItem>
						<SyFormItem name="itemTrigger" validate-trigger="change">
							<SyInput v-model="model.itemTrigger" />
						</SyFormItem>
						<SyFormItem name="ruleTrigger">
							<SyInput v-model="model.ruleTrigger" />
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const inputs = wrapper.findAll('input');
		const items = wrapper.findAll('.sy-form-item');

		await inputs[0].setValue('a');
		await flushPromises();

		expect(items[0].classes()).not.toContain('sy-form-item--error');

		await inputs[0].trigger('focusout');
		await flushPromises();

		expect(items[0].classes()).toContain('sy-form-item--error');
		expect(items[0].text()).toContain('Form 字段长度不足');

		await inputs[1].setValue('a');
		await flushPromises();

		expect(items[1].classes()).toContain('sy-form-item--error');
		expect(items[1].text()).toContain('FormItem 字段长度不足');

		await inputs[2].setValue('a');
		await flushPromises();

		expect(items[2].classes()).toContain('sy-form-item--error');
		expect(items[2].text()).toContain('Rule 字段长度不足');
	});

	it('revalidates changed rules only when validateOnRuleChange is enabled', async () => {
		const model = reactive({
			username: 'ab',
		});
		const rules = ref<FormRules>({
			username: {
				min: 1,
			},
		});
		const validateOnRuleChange = ref(false);
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyInput,
				},

				/**
				 * 提供动态规则和自动校验开关
				 */
				setup() {
					return {
						model,
						rules,
						validateOnRuleChange,
					};
				},

				template: `
					<SyForm
						:model="model"
						:rules="rules"
						:validate-on-rule-change="validateOnRuleChange"
					>
						<SyFormItem name="username">
							<SyInput v-model="model.username" />
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const item = wrapper.get('.sy-form-item');

		rules.value = {
			username: {
				min: 3,
				message: '第一次规则变化',
			},
		};
		await nextTick();
		await flushPromises();

		expect(item.classes()).not.toContain('sy-form-item--error');

		validateOnRuleChange.value = true;
		await nextTick();
		rules.value = {
			username: {
				min: 4,
				message: '规则变化后自动校验',
			},
		};
		await nextTick();
		await flushPromises();

		expect(item.classes()).toContain('sy-form-item--error');
		expect(item.text()).toContain('规则变化后自动校验');
	});

	it('passes Form size to controls while preserving explicit component sizes', () => {
		const model = reactive({
			input: '',
			select: undefined,
			checkbox: false,
			radio: false,
			radioButton: false,
			switch: false,
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyCheckbox,
					SyForm,
					SyFormItem,
					SyInput,
					SyRadio,
					SyRadioButton,
					SySelect,
					SySwitch,
				},

				/**
				 * 提供不同控件使用的表单模型
				 */
				setup() {
					return {
						model,
					};
				},

				template: `
					<SyForm :model="model" size="large">
						<SyFormItem name="input"><SyInput v-model="model.input" /></SyFormItem>
						<SyFormItem name="select"><SySelect v-model="model.select" /></SyFormItem>
						<SyFormItem name="checkbox"><SyCheckbox v-model="model.checkbox" /></SyFormItem>
						<SyFormItem name="radio"><SyRadio v-model="model.radio" /></SyFormItem>
						<SyFormItem name="radioButton">
							<SyRadioButton v-model="model.radioButton" />
						</SyFormItem>
						<SyFormItem name="switch"><SySwitch v-model="model.switch" /></SyFormItem>
						<SyFormItem><SyInput class="explicit-size" size="small" /></SyFormItem>
					</SyForm>
				`,
			}),
		);

		expect(wrapper.getComponent(SyInput).classes()).toContain('sy-input--large');
		expect(wrapper.getComponent(SySelect).classes()).toContain('sy-select-large');
		expect(wrapper.getComponent(SyCheckbox).classes()).toContain('sy-checkbox-large');
		expect(wrapper.getComponent(SyRadio).classes()).toContain('sy-radio-large');
		expect(wrapper.getComponent(SyRadioButton).classes()).toContain('sy-radio-button-large');
		expect(wrapper.getComponent(SySwitch).classes()).toContain('sy-switch-large');
		expect(wrapper.get('.explicit-size').classes()).toContain('sy-input--small');
	});

	it('passes disabled and size through CheckboxGroup and RadioGroup', () => {
		const model = reactive({
			checks: [],
			radio: '',
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyCheckbox,
					SyCheckboxGroup,
					SyForm,
					SyFormItem,
					SyRadio,
					SyRadioGroup,
				},

				/**
				 * 提供分组控件使用的表单模型
				 */
				setup() {
					return {
						model,
					};
				},

				template: `
					<SyForm :model="model" size="large" disabled>
						<SyFormItem name="checks">
							<SyCheckboxGroup v-model="model.checks">
								<SyCheckbox value="a">A</SyCheckbox>
							</SyCheckboxGroup>
						</SyFormItem>
						<SyFormItem name="radio">
							<SyRadioGroup v-model="model.radio">
								<SyRadio label="a">A</SyRadio>
							</SyRadioGroup>
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const checkboxGroup = wrapper.getComponent(SyCheckboxGroup);
		const radioGroup = wrapper.getComponent(SyRadioGroup);

		expect(wrapper.get('form').attributes('aria-disabled')).toBe('true');
		expect(checkboxGroup.classes()).toContain('sy-checkbox-group-large');
		expect(checkboxGroup.classes()).toContain('sy-checkbox-group-disabled');
		expect(checkboxGroup.attributes('aria-disabled')).toBe('true');
		expect(radioGroup.classes()).toContain('sy-radio-group-large');
		expect(radioGroup.classes()).toContain('sy-radio-group-disabled');
		expect(radioGroup.attributes('aria-disabled')).toBe('true');
		expect(wrapper.findAll('input').every((input) => input.attributes('disabled') !== undefined)).toBe(true);
	});

	it('renders warning feedback without rejecting form validation', async () => {
		const model = reactive({
			username: 'ab',
		});
		const rules: FormRules = {
			username: {
				min: 3,
				message: '建议至少输入三个字符',
				warningOnly: true,
			},
		};
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyInput,
				},

				/**
				 * 提供 warning-only 校验规则
				 */
				setup() {
					return {
						model,
						rules,
					};
				},

				template: `
					<SyForm :model="model" :rules="rules">
						<SyFormItem name="username" has-feedback>
							<SyInput v-model="model.username" />
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const form = getFormInstance(wrapper);

		await expect(form.validateFields()).resolves.toEqual({
			username: 'ab',
		});
		await flushPromises();

		const item = wrapper.get('.sy-form-item');
		const fieldResult = form.getFieldsError(['username'])[0];

		expect(item.classes()).toContain('sy-form-item--warning');
		expect(item.classes()).toContain('sy-form-item--has-feedback');
		expect(item.get('.sy-form-item__feedback--warning').text()).toBe('!');
		expect(item.get('.sy-form-item__message').text()).toBe('建议至少输入三个字符');
		expect(wrapper.get('input').attributes('aria-invalid')).toBeUndefined();
		expect(fieldResult.errors).toEqual([]);
		expect(fieldResult.warnings).toEqual(['建议至少输入三个字符']);
	});
});
