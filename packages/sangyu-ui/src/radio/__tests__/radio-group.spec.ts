import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, reactive, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { SyForm, SyFormItem } from '../../form';
import SyRadio from '../syradio';
import SyRadioButton from '../syradiobutton';
import SyRadioGroup from '../syradiogroup';

describe('SyRadioGroup', () => {
	it('shares group state with Radio and RadioButton children', async () => {
		const wrapper = mount(SyRadioGroup, {
			props: {
				modelValue: 'design',
				name: 'category',
				size: 'large',
			},
			slots: {
				default: () => [
					h(SyRadio, { label: 'design' }, () => '设计系统'),
					h(SyRadioButton, { label: 'components' }, () => '组件库'),
				],
			},
		});
		const radio = wrapper.getComponent(SyRadio);
		const radioButton = wrapper.getComponent(SyRadioButton);
		const inputs = wrapper.findAll('input');

		expect(wrapper.classes()).toEqual(
			expect.arrayContaining(['sy-radio-group', 'sy-radio-group-horizontal', 'sy-radio-group-large']),
		);
		expect(radio.classes()).toContain('sy-radio-checked');
		expect(radio.classes()).toContain('sy-radio-large');
		expect(radioButton.classes()).not.toContain('sy-radio-button-checked');
		expect(radioButton.classes()).toContain('sy-radio-button-large');
		expect(inputs.every((input) => input.attributes('name') === 'category')).toBe(true);

		await inputs[1].trigger('change');

		expect(wrapper.emitted('update:modelValue')).toEqual([['components']]);
		expect(wrapper.emitted('change')?.[0]?.slice(0, 2)).toEqual(['components', { label: 'components' }]);
		expect(wrapper.emitted('change')?.[0]?.[2]).toBeInstanceOf(Event);
	});

	it('blocks every child while the group is disabled', async () => {
		const wrapper = mount(SyRadioGroup, {
			props: {
				modelValue: 'design',
				disabled: true,
			},
			slots: {
				default: () => [
					h(SyRadio, { label: 'design' }, () => '设计系统'),
					h(SyRadioButton, { label: 'components' }, () => '组件库'),
				],
			},
		});
		const inputs = wrapper.findAll('input');

		expect(wrapper.classes()).toContain('sy-radio-group-disabled');
		expect(wrapper.attributes('aria-disabled')).toBe('true');
		expect(inputs.every((input) => input.attributes('disabled') !== undefined)).toBe(true);

		await inputs[1].trigger('change');

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect(wrapper.emitted('change')).toBeUndefined();
	});

	it('passes the dynamic Form disabled state through a RadioGroup', async () => {
		const formDisabled = ref(true);
		const groupDisabled = ref(false);
		const model = reactive({
			category: 'design',
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyRadio,
					SyRadioButton,
					SyRadioGroup,
				},

				/**
				 * 提供测试所需的分组模型和动态禁用状态
				 */
				setup() {
					return {
						formDisabled,
						groupDisabled,
						model,
					};
				},

				template: `
					<SyForm :model="model" :disabled="formDisabled">
						<SyFormItem name="category">
							<SyRadioGroup
								v-model="model.category"
								:disabled="groupDisabled"
							>
								<SyRadio label="design">设计系统</SyRadio>
								<SyRadioButton label="components">组件库</SyRadioButton>
							</SyRadioGroup>
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const group = wrapper.getComponent(SyRadioGroup);
		const inputs = group.findAll('input');

		// Form 禁用状态能够穿过 RadioGroup 传递给两种子组件
		expect(inputs.every((input) => input.attributes('disabled') !== undefined)).toBe(true);

		formDisabled.value = false;
		await nextTick();

		expect(inputs.every((input) => input.attributes('disabled') === undefined)).toBe(true);

		await inputs[1].trigger('change');
		expect(model.category).toBe('components');

		// Group 自身禁用仍然参与最终禁用状态
		groupDisabled.value = true;
		await nextTick();

		expect(inputs.every((input) => input.attributes('disabled') !== undefined)).toBe(true);

		await inputs[0].trigger('change');
		expect(model.category).toBe('components');
		expect(group.emitted('update:modelValue')).toHaveLength(1);
	});

	it('binds FormItem accessibility state to the native RadioButton input', async () => {
		const validateStatus = ref<'error' | undefined>('error');
		const help = ref<string | undefined>('请选择一个选项');
		const model = reactive({
			selected: false,
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyRadioButton,
				},

				/**
				 * 提供测试所需的表单模型和动态校验状态
				 */
				setup() {
					return {
						help,
						model,
						validateStatus,
					};
				},

				template: `
					<SyForm :model="model">
						<SyFormItem
							name="selected"
							:help="help"
							:validate-status="validateStatus"
						>
							<SyRadioButton
								v-model="model.selected"
								aria-describedby="external-help"
							>
								设计系统
							</SyRadioButton>
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const radioButton = wrapper.getComponent(SyRadioButton);
		const input = radioButton.get('input');
		const messageId = wrapper.get('.sy-form-item__message').attributes('id');

		// 校验属性只绑定到真实 input
		expect(input.attributes('aria-invalid')).toBe('true');
		expect(input.attributes('aria-describedby')?.split(/\s+/)).toEqual(
			expect.arrayContaining(['external-help', messageId]),
		);
		expect(radioButton.attributes('aria-invalid')).toBeUndefined();
		expect(radioButton.attributes('aria-describedby')).toBeUndefined();

		// 校验恢复后清理 FormItem 状态并保留外部描述
		validateStatus.value = undefined;
		help.value = undefined;
		await nextTick();

		expect(input.attributes('aria-invalid')).toBeUndefined();
		expect(input.attributes('aria-describedby')).toBe('external-help');
	});
});
