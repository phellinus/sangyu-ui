import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SyProgress from '../syprogress.vue';

describe('SyProgress', () => {
	it('renders line progress and shows percentage by default', () => {
		const wrapper = mount(SyProgress, {
			props: {
				percentage: 68,
			},
		});

		expect(wrapper.classes()).toContain('sy-progress-line');
		expect(wrapper.attributes('data-percentage')).toBe('68');
		expect(wrapper.attributes('aria-valuenow')).toBe('68');
		expect(wrapper.find('.sy-progress-info').text()).toBe('68%');
		expect(wrapper.find('.sy-progress-line-bar').attributes('style')).toContain('width: 68%');
	});

	it('clamps percentage and supports line size, radius, and theme color', () => {
		const wrapper = mount(SyProgress, {
			props: {
				percentage: 160,
				color: 'success',
				size: 12,
				borderRadius: 0,
				showInfo: false,
			},
		});

		expect(wrapper.attributes('data-percentage')).toBe('100');
		expect(wrapper.find('.sy-progress-info').exists()).toBe(false);
		expect(wrapper.attributes('style')).toContain('--sy-progress-line-size: 12px');
		expect(wrapper.find('.sy-progress-line-bar').attributes('style')).toContain('width: 100%');
		expect(wrapper.attributes('style')).toContain('--sy-progress-color: var(--sy-color-success)');
		expect(wrapper.find('.sy-progress-line-bar').attributes('style')).toContain('border-radius: 0px');
	});

	it('renders circle progress with svg attributes', () => {
		const wrapper = mount(SyProgress, {
			props: {
				type: 'circle',
				percentage: 40,
				color: '#ff7a59',
				size: 100,
			},
		});

		expect(wrapper.classes()).toContain('sy-progress-circle');
		expect(wrapper.find('.sy-progress-circle-svg').exists()).toBe(true);
		expect(wrapper.find('.sy-progress-circle-bar').attributes('stroke')).toBe('#ff7a59');
		expect(wrapper.find('.sy-progress-info-inside').text()).toBe('40%');
		expect(wrapper.attributes('style')).toContain('--sy-progress-circle-size: 100px');
	});
});
