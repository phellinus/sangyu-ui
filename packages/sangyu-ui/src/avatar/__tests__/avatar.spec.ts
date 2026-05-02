import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SyAvatar from '../avatar.vue';

describe('SyAvatar', () => {
	it('renders loading image state with shape and wrapper variables', async () => {
		const wrapper = mount(SyAvatar, {
			props: {
				src: '/avatar.png',
				shape: 'circle',
				size: 48,
				badge: true,
				badgePosition: 'top-left',
				badgeOffsetX: 4,
				badgeOffsetY: 6,
				badgeColor: '#336699',
				color: '#111111',
				bgcolor: '#f5f5f5',
			},
		});

		const avatar = wrapper.get('.sy-avatar');
		expect(avatar.classes()).toContain('sy-avatar-circle');
		expect(avatar.classes()).toContain('sy-avatar-loading');
		expect(wrapper.get('.sy-avatar-img').attributes('src')).toBe('/avatar.png');
		expect(wrapper.attributes('style')).toContain('--sy-badge-offset-x: 4px;');
		expect(wrapper.attributes('style')).toContain('--sy-badge-offset-y: 6px;');
		expect(wrapper.attributes('style')).toContain('--sy-avatar-font-size: 19px;');

		await wrapper.get('.sy-avatar-img').trigger('load');

		expect(wrapper.get('.sy-avatar').classes()).not.toContain('sy-avatar-loading');
	});

	it('falls back to first text character after image error', async () => {
		const wrapper = mount(SyAvatar, {
			props: {
				src: '/broken.png',
			},
			slots: {
				text: () => '测试用户',
			},
		});

		await wrapper.get('.sy-avatar-img').trigger('error');

		expect(wrapper.text()).toContain('测');
		expect(wrapper.text()).not.toContain('测试用户');
	});

	it('renders badge slot content with text badge classes', () => {
		const wrapper = mount(SyAvatar, {
			props: {
				badge: true,
				badgePosition: 'bottom-right',
			},
			slots: {
				text: () => '张',
				badge: () => '9+',
			},
		});

		const textBadge = wrapper.get('.sy-avatar-badge-text');
		expect(textBadge.text()).toBe('9+');
		expect(textBadge.classes()).toContain('sy-avatar-badge-bottom-right');
	});
});
