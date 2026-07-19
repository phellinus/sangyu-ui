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

		const suffixes = wrapper.findAll('.sy-input__suffix');
		await suffixes[suffixes.length - 1].trigger('click');

		expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['']);
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
});
