import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import SyResult from '../result';

describe('SyResult', () => {
	it('renders default info result with fallback title', () => {
		const wrapper = mount(SyResult, {
			props: {
				status: 'info',
			},
		});

		expect(wrapper.classes()).toContain('sy-result');
		expect(wrapper.classes()).toContain('sy-result-default');
		expect(wrapper.classes()).toContain('sy-result-info');
		expect(wrapper.attributes('data-status')).toBe('info');
		expect(wrapper.attributes('role')).toBe('status');
		expect(wrapper.find('.sy-result-title').text()).toBe('提示信息');
		expect(wrapper.find('.sy-result-visual .sy-icon').exists()).toBe(true);
	});

	it('renders exception code in compact layout', () => {
		const wrapper = mount(SyResult, {
			props: {
				status: '404',
				layout: 'compact',
			},
		});

		expect(wrapper.classes()).toContain('sy-result-compact');
		expect(wrapper.classes()).toContain('sy-result-exception');
		expect(wrapper.attributes('data-layout')).toBe('compact');
		expect(wrapper.find('.sy-result-code').text()).toBe('404');
		expect(wrapper.find('.sy-result-title').text()).toBe('页面似乎走丢了');
	});

	it('prefers icon slot and renders extra/body slots', () => {
		const wrapper = mount(SyResult, {
			props: {
				status: 'success',
				icon: 'check',
			},
			slots: {
				icon: () => h('span', { class: 'custom-icon' }, 'slot icon'),
				default: () => h('div', { class: 'custom-body' }, 'body text'),
				extra: () => h('button', { class: 'custom-extra' }, 'next'),
			},
		});

		expect(wrapper.find('.custom-icon').exists()).toBe(true);
		expect(wrapper.find('.sy-icon').exists()).toBe(false);
		expect(wrapper.find('.custom-body').text()).toBe('body text');
		expect(wrapper.find('.custom-extra').text()).toBe('next');
	});
});
