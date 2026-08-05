import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import SyForm from '../../form/SyForm';
import SyFormItem from '../../form/SyFormItem';
import SyInput from '../SyInput.vue';

describe('SyInput', () => {
	it('renders variant, size, slots and password visibility state', async () => {
		const wrapper = mount(SyInput, {
			props: {
				modelValue: '',
				type: 'label-border',
				size: 'large',
				label: '用户名',
				password: true,
				showPassword: false,
				width: '280px',
				height: '48px',
				bgColor: '#f5f5f5',
				textColor: '#222222',
				borderColor: '#cccccc',
				lineColor: '#dddddd',
			},
			attrs: {
				autocomplete: 'off',
			},
			slots: {
				prefix: () => 'P',
				suffix: () => 'S',
				fronticon: () => 'F',
				backicon: () => 'B',
			},
		});

		expect(wrapper.classes()).toContain('sy-input');
		expect(wrapper.classes()).toContain('sy-input--label-border');
		expect(wrapper.classes()).toContain('sy-input--label');
		expect(wrapper.classes()).toContain('sy-input--large');
		expect(wrapper.attributes('style')).toContain('width: 280px;');
		expect(wrapper.attributes('style')).toContain('height: 48px;');
		expect(wrapper.attributes('style')).toContain('--border-color: #cccccc;');
		expect(wrapper.get('.sy-input__prefix').text()).toBe('P');
		expect(wrapper.get('.sy-input__suffix').text()).toBe('S');
		expect(wrapper.get('.sy-input__fronticon').text()).toBe('F');
		expect(wrapper.get('.sy-input__backicon').text()).toBe('B');
		expect(wrapper.get('input').attributes('type')).toBe('password');
		expect(wrapper.get('input').attributes('autocomplete')).toBe('off');

		await wrapper.get('input').trigger('focus');
		expect(wrapper.classes()).toContain('hasfocu');
		// 验证浮动 Label 的 BEM 类名与 LESS 选择器保持一致。
		expect(wrapper.get('.sy-input-center-ph--label').classes()).toContain('is-float');

		await wrapper.setProps({ showPassword: true });
		expect(wrapper.get('input').attributes('type')).toBe('text');
	});

	it('emits update:modelValue on typing and clearing', async () => {
		const wrapper = mount(SyInput, {
			props: {
				modelValue: 'abc',
				clearable: true,
			},
		});

		await wrapper.get('input').setValue('abcd');
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['abcd']);

		await wrapper.setProps({ modelValue: 'abcd' });
		await nextTick();

		// 有值且 clearable 开启时，必须渲染默认清除 SVG。
		expect(wrapper.get('.sy-input__clear').find('svg').exists()).toBe(true);

		await wrapper.get('.sy-input__clear').trigger('click');

		expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['']);
		expect(wrapper.emitted('input')).toHaveLength(2);
		expect(wrapper.emitted('change')).toHaveLength(2);
		expect(wrapper.emitted('clear')).toHaveLength(1);
	});

	it('shows placeholder text only when unfocused and empty', async () => {
		const wrapper = mount(SyInput, {
			props: {
				modelValue: '',
				placeholder: '请输入内容',
			},
		});

		expect(wrapper.get('.sy-input-center-ph').text()).toBe('请输入内容');

		await wrapper.get('input').trigger('focus');
		expect(wrapper.find('.sy-input-center-ph').exists()).toBe(false);

		await wrapper.get('input').trigger('blur');
		expect(wrapper.get('.sy-input-center-ph').text()).toBe('请输入内容');
	});

	it('keeps label floating after blur when model value is not empty', async () => {
		const wrapper = mount(SyInput, {
			props: {
				modelValue: '',
				label: '用户名',
			},
		});

		const label = wrapper.get('.sy-input-center-ph--label');

		// 空值且未聚焦时，Label 不应上浮。
		expect(label.classes()).not.toContain('is-float');

		await wrapper.get('input').trigger('focus');
		expect(label.classes()).toContain('is-float');

		await wrapper.setProps({ modelValue: 'sangyu' });
		await wrapper.get('input').trigger('blur');

		// 有值失焦后，Label 仍然保持上浮。
		expect(label.classes()).toContain('is-float');
	});

	it('renders a custom clear icon instead of the default svg', () => {
		const wrapper = mount(SyInput, {
			props: {
				modelValue: 'abc',
				clearable: true,
			},
			slots: {
				// 自定义图标存在时，应替换组件内部默认 SVG。
				'clear-icon': () => '自定义清除',
			},
		});

		const clearButton = wrapper.get('.sy-input__clear');
		expect(clearButton.text()).toBe('自定义清除');
		expect(clearButton.find('svg').exists()).toBe(false);
	});

	it('forwards native form and aria attributes to the real input', () => {
		const wrapper = mount(SyInput, {
			attrs: {
				class: 'custom-root',
				'data-testid': 'input-wrapper',
				required: true,
				inputmode: 'numeric',
				pattern: '[0-9]+',
				'aria-describedby': 'input-help',
			},
		});

		const input = wrapper.get('input');

		// class 和 data-* 保留在组件根节点。
		expect(wrapper.classes()).toContain('custom-root');
		expect(wrapper.attributes('data-testid')).toBe('input-wrapper');

		// 表单和无障碍属性必须转发给真实 input。
		expect(input.attributes('required')).toBeDefined();
		expect(input.attributes('inputmode')).toBe('numeric');
		expect(input.attributes('pattern')).toBe('[0-9]+');
		expect(input.attributes('aria-describedby')).toBe('input-help');

		// 根节点不应错误携带原生表单属性。
		expect(wrapper.attributes('required')).toBeUndefined();
		expect(wrapper.attributes('inputmode')).toBeUndefined();
	});

	it('binds FormItem accessibility state to the native input and clears it after recovery', async () => {
		const validateStatus = ref<'error' | undefined>('error');
		const help = ref<string | undefined>('用户名不能为空');
		const model = reactive({
			username: '',
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyInput,
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
							name="username"
							:help="help"
							:validate-status="validateStatus"
						>
							<SyInput
								v-model="model.username"
								aria-describedby="external-help"
							/>
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		const input = wrapper.get('input');
		const control = wrapper.get('.sy-form-item__control-input');
		const message = wrapper.get('.sy-form-item__message');
		const messageId = message.attributes('id');

		// ARIA 校验属性必须绑定到真实 input 而不是 FormItem 容器
		expect(input.attributes('aria-invalid')).toBe('true');
		expect(input.attributes('aria-describedby')?.split(/\s+/)).toEqual(
			expect.arrayContaining(['external-help', messageId]),
		);
		expect(control.attributes('aria-invalid')).toBeUndefined();
		expect(control.attributes('aria-describedby')).toBeUndefined();

		// 校验恢复后移除错误状态和 FormItem 消息引用并保留外部描述
		validateStatus.value = undefined;
		help.value = undefined;
		await nextTick();

		expect(input.attributes('aria-invalid')).toBeUndefined();
		expect(input.attributes('aria-describedby')).toBe('external-help');
		expect(wrapper.find('.sy-form-item__message').exists()).toBe(false);
	});

	it('emits only the final value after composition input ends', async () => {
		const wrapper = mount(SyInput, {
			props: {
				modelValue: '',
			},
		});
		const input = wrapper.get('input');
		const element = input.element as HTMLInputElement;

		// 开始中文输入法组合输入。
		await input.trigger('compositionstart');
		element.value = 'n';
		await input.trigger('input');

		// 拼音中间值不应提交给 v-model。
		expect(wrapper.emitted('update:modelValue')).toBeUndefined();

		element.value = '你';
		await input.trigger('compositionend');

		// 组合结束后只提交最终文字。
		expect(wrapper.emitted('update:modelValue')).toEqual([['你']]);
	});

	it('uses css variables so disabled styles can override dynamic colors', () => {
		const wrapper = mount(SyInput, {
			props: {
				disabled: true,
				textColor: '#111111',
				bgColor: '#eeeeee',
			},
		});
		const style = (wrapper.element as HTMLElement).style;

		// 根节点不再使用高优先级的内联 color/backgroundColor。
		expect(style.color).toBe('');
		expect(style.backgroundColor).toBe('');

		// 动态颜色改为通过 CSS 变量提供。
		expect(style.getPropertyValue('--sy-input-text-color')).toBe('#111111');
		expect(style.getPropertyValue('--sy-input-bg')).toBe('#eeeeee');
	});

	it('inherits the Form disabled state and reacts to dynamic updates', async () => {
		const formDisabled = ref(true);
		const model = reactive({
			username: '',
		});

		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyInput,
				},

				/**
				 * 提供测试所需的表单模型和动态禁用状态。
				 */
				setup() {
					return {
						formDisabled,
						model,
					};
				},

				template: `
					<SyForm :model="model" :disabled="formDisabled">
						<SyFormItem name="username">
							<SyInput v-model="model.username" />
						</SyFormItem>
					</SyForm>
				`,
			}),
		);

		const inputComponent = wrapper.getComponent(SyInput);
		const input = wrapper.get('input');

		// Form 禁用时，Input 的原生状态和 BEM 状态类都应同步禁用。
		expect(input.attributes('disabled')).toBeDefined();
		expect(inputComponent.classes()).toContain('sy-input--disabled');

		// 即使主动派发输入事件，禁用状态也不能更新表单模型。
		await input.setValue('blocked');
		expect(model.username).toBe('');
		expect(inputComponent.emitted('update:modelValue')).toBeUndefined();

		// Form 恢复可用后，Input 应立即恢复输入能力。
		formDisabled.value = false;
		await nextTick();

		expect(input.attributes('disabled')).toBeUndefined();
		expect(inputComponent.classes()).not.toContain('sy-input--disabled');

		await input.setValue('sangyu');
		expect(model.username).toBe('sangyu');
	});

	it('keeps Input disabled when its own disabled prop is true', async () => {
		const inputDisabled = ref(true);
		const model = reactive({
			username: '',
		});

		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SyInput,
				},

				/**
				 * 提供测试所需的表单模型和 Input 自身禁用状态。
				 */
				setup() {
					return {
						inputDisabled,
						model,
					};
				},

				template: `
					<SyForm :model="model">
						<SyFormItem name="username">
							<SyInput
								v-model="model.username"
								:disabled="inputDisabled"
							/>
						</SyFormItem>
					</SyForm>
				`,
			}),
		);

		const inputComponent = wrapper.getComponent(SyInput);
		const input = wrapper.get('input');

		expect(input.attributes('disabled')).toBeDefined();
		expect(inputComponent.classes()).toContain('sy-input--disabled');

		inputDisabled.value = false;
		await nextTick();

		expect(input.attributes('disabled')).toBeUndefined();
		expect(inputComponent.classes()).not.toContain('sy-input--disabled');
	});
});
