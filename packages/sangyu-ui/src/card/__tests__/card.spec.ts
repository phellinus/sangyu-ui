import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SyCard from '../card.vue';

describe('SyCard', () => {
	it('renders header body and footer slots with shadow modifier', () => {
		const wrapper = mount(SyCard, {
			props: {
				shadow: 'hover',
				borderRadius: 12,
				customStyle: 'width: 320px;',
				headerStyle: 'color: red;',
				bodyStyle: 'padding: 24px;',
				footerStyle: 'text-align: right;',
			},
			slots: {
				header: () => '卡片标题',
				default: () => '卡片内容',
				footer: () => '卡片底部',
			},
		});

		expect(wrapper.classes()).toContain('sy-card');
		expect(wrapper.classes()).toContain('sy-card--shadow-hover');
		expect(wrapper.attributes('style')).toContain('width: 320px;');
		expect(wrapper.attributes('style')).toContain('border-radius: 12px;');
		expect(wrapper.get('.sy-card-header').text()).toBe('卡片标题');
		expect(wrapper.get('.sy-card-header').attributes('style')).toContain('color: red;');
		expect(wrapper.get('.sy-card-content').text()).toBe('卡片内容');
		expect(wrapper.get('.sy-card-content').attributes('style')).toContain('padding: 24px;');
		expect(wrapper.get('.sy-card-footer').text()).toBe('卡片底部');
		expect(wrapper.get('.sy-card-footer').attributes('style')).toContain('text-align: right;');
	});

	it('omits header and footer sections when slots are absent', () => {
		const wrapper = mount(SyCard, {
			slots: {
				default: () => '只有正文',
			},
		});

		expect(wrapper.find('.sy-card-header').exists()).toBe(false);
		expect(wrapper.find('.sy-card-footer').exists()).toBe(false);
		expect(wrapper.get('.sy-card-content').text()).toBe('只有正文');
	});
});
