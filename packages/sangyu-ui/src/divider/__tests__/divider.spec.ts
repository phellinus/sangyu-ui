import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SyDivider from '../divider';

describe('SyDivider', () => {
	it('renders horizontal divider by default', () => {
		const wrapper = mount(SyDivider);

		expect(wrapper.classes()).toContain('sy-divider');
		expect(wrapper.classes()).toContain('sy-divider-horizontal');
		expect(wrapper.attributes('role')).toBe('separator');
		expect(wrapper.attributes('aria-orientation')).toBe('horizontal');
		expect(wrapper.find('.sy-divider-line-full').exists()).toBe(true);
	});

	it('renders content and alignment classes', () => {
		const wrapper = mount(SyDivider, {
			props: {
				align: 'left',
				variant: 'dashed',
				content: 'OR',
			},
		});

		expect(wrapper.classes()).toContain('sy-divider-with-content');
		expect(wrapper.classes()).toContain('sy-divider-left');
		expect(wrapper.classes()).toContain('sy-divider-dashed');
		expect(wrapper.find('.sy-divider-content').text()).toBe('OR');
		expect(wrapper.find('.sy-divider-line-start').exists()).toBe(true);
		expect(wrapper.find('.sy-divider-line-end').exists()).toBe(true);
	});

	it('prefers slot content over content prop', () => {
		const wrapper = mount(SyDivider, {
			props: {
				content: 'fallback',
			},
			slots: {
				default: () => 'slot content',
			},
		});

		expect(wrapper.find('.sy-divider-content').text()).toBe('slot content');
	});

	it('renders vertical divider with custom size styles', () => {
		const wrapper = mount(SyDivider, {
			props: {
				direction: 'vertical',
				variant: 'dotted',
				thickness: 'thick',
				height: 24,
				margin: 6,
				color: 'success',
			},
		});

		expect(wrapper.classes()).toContain('sy-divider-vertical');
		expect(wrapper.classes()).toContain('sy-divider-dotted');
		expect(wrapper.attributes('aria-orientation')).toBe('vertical');
		expect(wrapper.attributes('style')).toContain('height: 24px');
		expect(wrapper.attributes('style')).toContain('margin: 6px');
		expect(wrapper.attributes('style')).toContain('--sy-divider-color: var(--sy-color-success)');
		expect(wrapper.attributes('style')).toContain('--sy-divider-thickness: 4px');
	});
});
