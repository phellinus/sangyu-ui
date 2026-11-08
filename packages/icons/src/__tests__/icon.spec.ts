import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { describe, expect, it } from 'vitest';
import { SyAimIcon, SyIcon, registerIcon } from '..';

describe('SyIcon registry compatibility', () => {
	it('renders a builtin by its normalized name without manual registration', () => {
		const wrapper = mount(SyIcon, { props: { name: 'SyAimIcon' } });
		expect(wrapper.findComponent(SyAimIcon).exists()).toBe(true);
		expect(wrapper.find('svg').exists()).toBe(true);
		wrapper.unmount();
	});

	it('renders custom overrides and aliases without losing builtin support', () => {
		const custom = defineComponent({ name: 'BrandMark', render: () => h('svg', { 'data-brand': 'custom' }) });
		registerIcon('aim', custom, { aliases: ['brand-logo'] });
		const wrapper = mount(SyIcon, { props: { name: 'brand-logo' } });
		try {
			expect(wrapper.find('[data-brand="custom"]').exists()).toBe(true);
		} finally {
			wrapper.unmount();
			registerIcon('aim', SyAimIcon);
		}
	});

	it('prefers an explicitly supplied component over a builtin name', () => {
		const custom = defineComponent({ render: () => h('svg', { 'data-explicit': 'true' }) });
		const wrapper = mount(SyIcon, { props: { name: 'aim', component: custom } });
		expect(wrapper.find('[data-explicit="true"]').exists()).toBe(true);
		wrapper.unmount();
	});

	it('preserves the placeholder and slot for an unknown name', () => {
		const wrapper = mount(SyIcon, { props: { name: 'missing-icon' }, slots: { default: () => 'fallback' } });
		expect(wrapper.classes()).toContain('sy-icon--placeholder');
		expect(wrapper.text()).toBe('fallback');
		wrapper.unmount();
	});
});
