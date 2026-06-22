import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import SyCheckbox from '../SyCheckbox';
import SyCheckboxGroup from '../SyCheckboxGroup';
import type { CheckboxValue } from '../Checkbox.types';

function createOptions(values: CheckboxValue[]) {
	return values.map((value) => h(SyCheckbox, { value }, () => String(typeof value === 'object' ? '对象' : value)));
}

describe('SyCheckboxGroup', () => {
	it('renders layout classes and passes shared properties to children', () => {
		const wrapper = mount(SyCheckboxGroup, {
			props: {
				modelValue: ['read'],
				direction: 'vertical',
				size: 'large',
				name: 'permissions',
				customStyle: 'width: 240px;',
			},
			slots: {
				default: () => createOptions(['read', 'write']),
			},
		});

		expect(wrapper.attributes('role')).toBe('group');
		expect(wrapper.classes()).toEqual(
			expect.arrayContaining(['sy-checkbox-group', 'sy-checkbox-group-vertical', 'sy-checkbox-group-large']),
		);
		expect(wrapper.attributes('style')).toContain('width: 240px;');

		const checkboxes = wrapper.findAllComponents(SyCheckbox);
		expect(checkboxes).toHaveLength(2);
		expect(checkboxes.every((checkbox) => checkbox.classes().includes('sy-checkbox-large'))).toBe(true);
		expect(checkboxes[0].classes()).toContain('sy-checkbox-checked');
		expect(checkboxes[1].classes()).not.toContain('sy-checkbox-checked');
		expect(wrapper.findAll('input').every((input) => input.attributes('name') === 'permissions')).toBe(true);
	});

	it('emits a new selected-value array when an option changes', async () => {
		const original = ['read'];
		const wrapper = mount(SyCheckboxGroup, {
			props: {
				modelValue: original,
			},
			slots: {
				default: () => createOptions(['read', 'write']),
			},
		});

		await wrapper.findAll('input')[1].trigger('change');

		expect(wrapper.emitted('update:modelValue')).toEqual([[['read', 'write']]]);
		expect(wrapper.emitted('change')).toEqual([[['read', 'write']]]);
		expect(original).toEqual(['read']);
	});

	it('matches and removes object values by structure', async () => {
		const selected = { id: 1, scope: 'read' };
		const equivalentOption = { id: 1, scope: 'read' };
		const wrapper = mount(SyCheckboxGroup, {
			props: {
				modelValue: [selected],
			},
			slots: {
				default: () => createOptions([equivalentOption]),
			},
		});

		expect(wrapper.getComponent(SyCheckbox).classes()).toContain('sy-checkbox-checked');

		await wrapper.get('input').trigger('change');
		expect(wrapper.emitted('update:modelValue')).toEqual([[[]]]);
	});

	it('disables only operations that would violate min or max', async () => {
		const minWrapper = mount(SyCheckboxGroup, {
			props: {
				modelValue: ['read'],
				min: 1,
			},
			slots: {
				default: () => createOptions(['read', 'write']),
			},
		});
		const minInputs = minWrapper.findAll('input');

		expect(minInputs[0].attributes('disabled')).toBeDefined();
		expect(minInputs[1].attributes('disabled')).toBeUndefined();
		await minInputs[0].trigger('change');
		expect(minWrapper.emitted('update:modelValue')).toBeUndefined();

		const maxWrapper = mount(SyCheckboxGroup, {
			props: {
				modelValue: ['read', 'write'],
				max: 2,
			},
			slots: {
				default: () => createOptions(['read', 'write', 'delete']),
			},
		});
		const maxInputs = maxWrapper.findAll('input');

		expect(maxInputs[0].attributes('disabled')).toBeUndefined();
		expect(maxInputs[1].attributes('disabled')).toBeUndefined();
		expect(maxInputs[2].attributes('disabled')).toBeDefined();
		await maxInputs[2].trigger('change');
		expect(maxWrapper.emitted('update:modelValue')).toBeUndefined();
	});

	it('disables every child and blocks group events when disabled', async () => {
		const wrapper = mount(SyCheckboxGroup, {
			props: {
				modelValue: ['read'],
				disabled: true,
			},
			slots: {
				default: () => createOptions(['read', 'write']),
			},
		});

		expect(wrapper.classes()).toContain('sy-checkbox-group-disabled');
		expect(wrapper.findAll('input').every((input) => input.attributes('disabled') !== undefined)).toBe(true);

		await wrapper.findAll('input')[1].trigger('change');
		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect(wrapper.emitted('change')).toBeUndefined();
	});
});
