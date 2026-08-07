import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { SyForm, SyFormItem } from '../../form';
import SyRadio from '../SyRadio';

describe('SyRadio', () => {
	it('renders checked state, native attributes and content', () => {
		const wrapper = mount(SyRadio, {
			props: {
				modelValue: true,
				label: 'design',
				shape: 'square',
				size: 'large',
				name: 'category',
				id: 'design-radio',
				content: '设计系统',
				customStyle: 'margin-top: 8px;',
				inputAttrs: {
					required: true,
					'data-test': 'design-radio-input',
				},
			},
		});
		const input = wrapper.get('input');

		expect(wrapper.classes()).toEqual(
			expect.arrayContaining(['sy-radio', 'sy-radio-square', 'sy-radio-large', 'sy-radio-checked']),
		);
		expect(wrapper.attributes('style')).toContain('margin-top: 8px;');
		expect(wrapper.get('.sy-radio-label').text()).toBe('设计系统');
		expect(input.attributes('id')).toBe('design-radio');
		expect(input.attributes('name')).toBe('category');
		expect(input.attributes('value')).toBe('design');
		expect(input.attributes('required')).toBeDefined();
		expect(input.attributes('data-test')).toBe('design-radio-input');
		expect((input.element as HTMLInputElement).checked).toBe(true);
	});

	it('emits the standalone model and change events once selected', async () => {
		const wrapper = mount(SyRadio, {
			props: {
				modelValue: false,
				label: 'components',
			},
		});
		const input = wrapper.get('input');

		await input.trigger('change');

		expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
		expect(wrapper.emitted('change')?.[0]?.slice(0, 2)).toEqual([true, 'components']);
		expect(wrapper.emitted('change')?.[0]?.[2]).toBeInstanceOf(Event);

		await wrapper.setProps({ modelValue: true });
		await input.trigger('change');

		expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
		expect(wrapper.emitted('change')).toHaveLength(1);
	});

	it('blocks native changes while its own disabled prop is true', async () => {
		const wrapper = mount(SyRadio, {
			props: {
				modelValue: false,
				disabled: true,
			},
		});
		const input = wrapper.get('input');

		expect(wrapper.classes()).toContain('sy-radio-disabled');
		expect(input.attributes('disabled')).toBeDefined();

		await input.trigger('change');

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect(wrapper.emitted('change')).toBeUndefined();
	});

	it('merges Form and Radio disabled states and reacts to dynamic updates', async () => {
		const formDisabled = ref(true);
		const radioDisabled = ref(false);
		const model = reactive({
			selected: false,
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyRadio,
				},

				/**
				 * 提供测试所需的表单模型和动态禁用状态
				 */
				setup() {
					return {
						formDisabled,
						model,
						radioDisabled,
					};
				},

				template: `
					<SyForm :model="model" :disabled="formDisabled">
						<SyFormItem name="selected">
							<SyRadio
								v-model="model.selected"
								:disabled="radioDisabled"
							>
								启用功能
							</SyRadio>
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const radio = wrapper.getComponent(SyRadio);
		const input = radio.get('input');

		// Form 禁用时同步原生属性和状态类并阻止模型更新
		expect(input.attributes('disabled')).toBeDefined();
		expect(radio.classes()).toContain('sy-radio-disabled');

		await input.trigger('change');
		expect(model.selected).toBe(false);
		expect(radio.emitted('update:modelValue')).toBeUndefined();

		// Form 恢复可用后 Radio 应立即恢复正常交互
		formDisabled.value = false;
		await nextTick();

		expect(input.attributes('disabled')).toBeUndefined();
		expect(radio.classes()).not.toContain('sy-radio-disabled');

		await input.trigger('change');
		expect(model.selected).toBe(true);

		// Radio 自身禁用后即使 Form 可用也必须保持禁用
		radioDisabled.value = true;
		await nextTick();

		expect(input.attributes('disabled')).toBeDefined();
		expect(radio.classes()).toContain('sy-radio-disabled');

		await input.trigger('change');
		expect(model.selected).toBe(true);
		expect(radio.emitted('update:modelValue')).toHaveLength(1);
	});

	it('binds FormItem accessibility state to the native Radio input', async () => {
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
					SyRadio,
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
							<SyRadio
								v-model="model.selected"
								aria-describedby="external-help"
							>
								设计系统
							</SyRadio>
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const radio = wrapper.getComponent(SyRadio);
		const input = radio.get('input');
		const messageId = wrapper.get('.sy-form-item__message').attributes('id');

		// 校验属性只绑定到真实 input
		expect(input.attributes('aria-invalid')).toBe('true');
		expect(input.attributes('aria-describedby')?.split(/\s+/)).toEqual(
			expect.arrayContaining(['external-help', messageId]),
		);
		expect(radio.attributes('aria-invalid')).toBeUndefined();
		expect(radio.attributes('aria-describedby')).toBeUndefined();

		// 校验恢复后清理 FormItem 状态并保留外部描述
		validateStatus.value = undefined;
		help.value = undefined;
		await nextTick();

		expect(input.attributes('aria-invalid')).toBeUndefined();
		expect(input.attributes('aria-describedby')).toBe('external-help');
	});
});
