import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import SySwitch from '../SySwitch.vue';

describe('SySwitch', () => {
	it('renders modifier classes, native attributes and computed styles', () => {
		const wrapper = mount(SySwitch, {
			props: {
				modelValue: true,
				size: 'large',
				shape: 'square',
				name: 'publish-status',
				color: '#3b82f6',
				inactiveColor: '#dbeafe',
				checkedText: '已发布',
				customStyle: 'margin-top: 8px;',
			},
		});

		expect(wrapper.classes()).toEqual(
			expect.arrayContaining([
				'sy-switch',
				'sy-switch-large',
				'sy-switch-square',
				'sy-switch-checked',
				'sy-switch-with-text',
			]),
		);
		expect(wrapper.attributes('style')).toContain('margin-top: 8px;');
		expect(wrapper.attributes('style')).toContain('--sy-switch-active-color: #3b82f6;');
		expect(wrapper.attributes('style')).toContain('--sy-switch-inactive-color: #dbeafe;');
		expect(wrapper.get('.sy-switch-label').text()).toBe('已发布');

		const input = wrapper.get('input');
		expect(input.attributes('name')).toBe('publish-status');
		expect(input.attributes('id')).toContain('sy-switch-');
		expect(input.attributes('aria-checked')).toBe('true');
		expect((input.element as HTMLInputElement).checked).toBe(true);
	});

	it('renders checked and unchecked slots according to state', async () => {
		const wrapper = mount(SySwitch, {
			props: {
				modelValue: false,
			},
			slots: {
				checked: () => '开启',
				unchecked: () => '关闭',
			},
		});

		expect(wrapper.get('.sy-switch-label').text()).toBe('关闭');

		await wrapper.setProps({ modelValue: true });

		expect(wrapper.get('.sy-switch-label').text()).toBe('开启');
	});

	it('emits custom active and inactive values when toggled', async () => {
		const onChange = vi.fn();
		const wrapper = mount(SySwitch, {
			props: {
				modelValue: 'draft',
				activeValue: 'published',
				inactiveValue: 'draft',
				onChange,
			},
		});

		await wrapper.get('input').trigger('change');

		expect(wrapper.emitted('update:modelValue')).toEqual([['published']]);
		expect(wrapper.emitted('change')).toEqual([['published', true]]);
		expect(onChange).toHaveBeenNthCalledWith(1, 'published', true);

		await wrapper.setProps({ modelValue: 'published' });
		await wrapper.get('input').trigger('change');

		expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['draft']);
		expect(wrapper.emitted('change')?.[1]).toEqual(['draft', false]);
		expect(onChange).toHaveBeenLastCalledWith('draft', false);
	});

	it.each([
		{ state: 'disabled', props: { disabled: true } },
		{ state: 'loading', props: { loading: true } },
	])('blocks changes while $state', async ({ state, props }) => {
		const wrapper = mount(SySwitch, {
			props: {
				modelValue: false,
				...props,
			},
		});

		expect(wrapper.classes()).toContain(`sy-switch-${state}`);
		expect(wrapper.classes()).toContain('sy-switch-disabled');
		expect(wrapper.get('input').attributes('disabled')).toBeDefined();
		if (state === 'loading') expect(wrapper.find('.sy-switch-spinner').exists()).toBe(true);

		await wrapper.get('input').trigger('change');

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect(wrapper.emitted('change')).toBeUndefined();
	});

	it('syncs indeterminate state and expose methods to the native input', async () => {
		const wrapper = mount(SySwitch, {
			props: {
				modelValue: false,
				indeterminate: true,
			},
			attachTo: document.body,
		});

		const input = wrapper.get('input');
		expect(wrapper.classes()).toContain('sy-switch-indeterminate');
		expect(input.attributes('aria-checked')).toBe('mixed');
		expect(wrapper.find('.sy-switch-minus').exists()).toBe(true);

		(wrapper.vm as { focus: () => void; blur: () => void }).focus();
		await nextTick();
		expect(document.activeElement).toBe(input.element);

		(wrapper.vm as { focus: () => void; blur: () => void }).blur();
		await nextTick();
		expect(document.activeElement).not.toBe(input.element);

		wrapper.unmount();
	});
});
