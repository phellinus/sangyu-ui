import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
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
});
