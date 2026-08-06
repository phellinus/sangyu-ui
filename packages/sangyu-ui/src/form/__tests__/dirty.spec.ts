import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive } from 'vue';
import { describe, expect, it } from 'vitest';
import SyInput from '../../input/SyInput.vue';
import SyForm from '../SyForm';
import SyFormItem from '../SyFormItem';
import { FieldContext, FormInstance } from '../Form.type';

interface FormTestInstance extends FormInstance {
	fields: Map<string, FieldContext>;
}

/**
 * 获取测试表单向外暴露的实例
 * @param wrapper 表单测试组件
 * @returns 表单实例
 */
function getFormInstance(wrapper: ReturnType<typeof mount>): FormTestInstance {
	return wrapper.getComponent(SyForm).getCurrentComponent().exposed as unknown as FormTestInstance;
}

/**
 * 获取测试表单中注册的第一个字段
 * @param wrapper 表单测试组件
 * @returns 注册的字段上下文
 */
function getFirstField(wrapper: ReturnType<typeof mount>): FieldContext {
	const form = getFormInstance(wrapper);
	const field = [...form.fields.values()][0];

	if (!field) {
		throw new Error('表单字段注册失败');
	}

	return field;
}

describe('SyForm dirty state', () => {
	it('marks a field dirty only while its value differs from the initial value', async () => {
		const model = reactive({
			username: 'sangyu',
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyInput,
				},

				/**
				 * 提供测试所需的表单模型
				 */
				setup() {
					return {
						model,
					};
				},

				template: `
					<SyForm :model="model">
						<SyFormItem name="username">
							<SyInput v-model="model.username" />
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const field = getFirstField(wrapper);
		const input = wrapper.get('input');

		expect(field.dirty.value).toBe(false);
		expect(field.touched.value).toBe(false);

		await input.setValue('changed');

		expect(field.dirty.value).toBe(true);
		expect(field.touched.value).toBe(true);

		await input.setValue('sangyu');

		expect(field.dirty.value).toBe(false);
		expect(field.touched.value).toBe(true);
	});

	it('updates dirty for programmatic and nested model changes', async () => {
		const model = reactive({
			settings: {
				theme: 'light',
				options: ['compact'],
			},
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
				},

				/**
				 * 提供测试所需的嵌套表单模型
				 */
				setup() {
					return {
						model,
					};
				},

				template: `
					<SyForm :model="model">
						<SyFormItem name="settings" />
					</SyForm>
				`,
			}),
		);
		const form = getFormInstance(wrapper);
		const field = getFirstField(wrapper);

		form.setFieldValue('settings', {
			theme: 'light',
			options: ['compact'],
		});
		await nextTick();

		expect(field.dirty.value).toBe(false);

		model.settings.theme = 'dark';
		await nextTick();

		expect(field.dirty.value).toBe(true);

		form.resetFields(['settings']);
		await nextTick();

		expect(model.settings).toEqual({
			theme: 'light',
			options: ['compact'],
		});
		expect(field.dirty.value).toBe(false);
		expect(field.touched.value).toBe(false);
	});
});
