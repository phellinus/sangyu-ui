import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SyCheckbox from '../SyCheckbox';

describe('SyCheckbox', () => {
	it('renders state classes, native attributes and custom content', () => {
		const wrapper = mount(SyCheckbox, {
			props: {
				modelValue: true,
				size: 'large',
				labelPosition: 'before',
				lineThrough: true,
				name: 'agreement',
				id: 'agreement-checkbox',
				color: '#0891b2',
				customStyle: 'margin-top: 8px;',
			},
			attrs: {
				required: true,
				'data-test': 'agreement-input',
			},
			slots: {
				default: () => '同意服务协议',
				icon: () => '✓',
			},
		});

		expect(wrapper.classes()).toEqual(
			expect.arrayContaining([
				'sy-checkbox',
				'sy-checkbox-large',
				'sy-checkbox-checked',
				'sy-checkbox-label-before',
				'sy-checkbox-line-through',
			]),
		);
		expect(wrapper.attributes('style')).toContain('margin-top: 8px;');
		expect(wrapper.attributes('style')).toContain('--sy-checkbox-color: #0891b2;');
		expect(wrapper.get('.sy-checkbox-label').text()).toBe('同意服务协议');
		expect(wrapper.get('.sy-checkbox-icon').text()).toBe('✓');

		const input = wrapper.get('input');
		expect(input.attributes('id')).toBe('agreement-checkbox');
		expect(input.attributes('name')).toBe('agreement');
		expect(input.attributes('required')).toBeDefined();
		expect(input.attributes('data-test')).toBe('agreement-input');
		expect((input.element as HTMLInputElement).checked).toBe(true);
	});

	it('uses content and label according to their documented priority', () => {
		const contentWrapper = mount(SyCheckbox, {
			props: {
				content: '内容文本',
				label: '标签文本',
			},
		});
		const labelWrapper = mount(SyCheckbox, {
			props: {
				label: '标签文本',
			},
		});

		expect(contentWrapper.get('.sy-checkbox-label').text()).toBe('内容文本');
		expect(labelWrapper.get('.sy-checkbox-label').text()).toBe('标签文本');
	});

	it('emits custom true and false values when toggled', async () => {
		const wrapper = mount(SyCheckbox, {
			props: {
				modelValue: 'off',
				trueValue: 'on',
				falseValue: 'off',
			},
		});

		await wrapper.get('input').trigger('change');

		expect(wrapper.emitted('update:modelValue')).toEqual([['on']]);
		expect(wrapper.emitted('change')).toEqual([['on', true]]);

		await wrapper.setProps({ modelValue: 'on' });
		await wrapper.get('input').trigger('change');

		expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['off']);
		expect(wrapper.emitted('change')?.[1]).toEqual(['off', false]);
	});

	it('adds and removes structurally equal values in array mode', async () => {
		const option = { id: 1, scope: 'read' };
		const wrapper = mount(SyCheckbox, {
			props: {
				modelValue: [{ id: 1, scope: 'read' }],
				value: option,
			},
		});

		expect(wrapper.classes()).toContain('sy-checkbox-checked');

		await wrapper.get('input').trigger('change');
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]]);

		await wrapper.setProps({ modelValue: [] });
		await wrapper.get('input').trigger('change');
		expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([[option]]);
	});

	it('syncs the indeterminate state to the native input', async () => {
		const wrapper = mount(SyCheckbox, {
			props: {
				modelValue: false,
				indeterminate: true,
			},
		});
		const input = wrapper.get('input');
		await wrapper.vm.$nextTick();

		expect(wrapper.classes()).toContain('sy-checkbox-indeterminate');
		expect(input.attributes('aria-checked')).toBe('mixed');
		expect((input.element as HTMLInputElement).indeterminate).toBe(true);
		expect(wrapper.find('.sy-checkbox-mixed-mark').exists()).toBe(true);

		await wrapper.setProps({ indeterminate: false });

		expect((input.element as HTMLInputElement).indeterminate).toBe(false);
		expect(wrapper.find('.sy-checkbox-check-mark').exists()).toBe(true);
	});

	it.each([
		{ state: 'disabled', props: { disabled: true } },
		{ state: 'loading', props: { loading: true } },
	])('blocks changes while $state', async ({ state, props }) => {
		const wrapper = mount(SyCheckbox, {
			props: {
				modelValue: false,
				...props,
			},
		});

		expect(wrapper.classes()).toContain(`sy-checkbox-${state}`);
		expect(wrapper.get('input').attributes('disabled')).toBeDefined();
		if (state === 'loading') expect(wrapper.find('.sy-checkbox-spinner').exists()).toBe(true);

		await wrapper.get('input').trigger('change');
		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect(wrapper.emitted('change')).toBeUndefined();
	});
});
