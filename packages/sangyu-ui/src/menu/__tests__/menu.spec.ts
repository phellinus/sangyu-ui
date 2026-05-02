import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import SyMenu from '../menu';
import SyMenuItem from '../menuitem';
import SySubMenu from '../submenu';

describe('SyMenu', () => {
	it('renders active item and opened submenu from defaults', () => {
		const wrapper = mount(SyMenu, {
			props: {
				defaultIndex: '2-1',
				defaultOpenSubMenus: ['2'],
			},
			slots: {
				default: () => [
					h(SyMenuItem, { index: '1' }, () => '首页'),
					h(
						SySubMenu,
						{ index: '2', title: '设置', onlyExpand: true },
						{
							default: () => [h(SyMenuItem, { index: '2-1', to: '/profile' }, () => '个人资料')],
						},
					),
				],
			},
		});

		expect(wrapper.classes()).toContain('sy-menu');
		expect(wrapper.classes()).toContain('sy-menu-vertical');
		expect(wrapper.find('[data-index="2-1"]').classes()).toContain('sy-menu-item-active');
		expect(wrapper.get('.sy-submenu').classes()).toContain('is-open');
		expect(wrapper.get('.sy-submenu-title').classes()).toContain('sy-submenu-title-active');
		expect(wrapper.find('.sy-submenu-inline').exists()).toBe(true);
	});

	it('updates active item and calls onSelect on click', async () => {
		const onSelect = vi.fn();
		const wrapper = mount(SyMenu, {
			props: {
				onSelect,
			},
			slots: {
				default: () => [
					h(SyMenuItem, { index: '1', to: '/home' }, () => '首页'),
					h(SyMenuItem, { index: '2', to: '/docs' }, () => '文档'),
				],
			},
		});

		await wrapper.find('[data-index="2"]').trigger('click');

		expect(onSelect).toHaveBeenCalledWith('2', '/docs');
		expect(wrapper.find('[data-index="2"]').classes()).toContain('sy-menu-item-active');
	});

	it('renders popup submenu in horizontal mode', () => {
		const wrapper = mount(SyMenu, {
			props: {
				mode: 'horizontal',
				itemPosition: 'center',
			},
			slots: {
				default: () => [
					h(
						SySubMenu,
						{ index: 'tools', title: '工具箱' },
						{
							default: () => [h(SyMenuItem, { index: 'tools-1' }, () => '按钮')],
						},
					),
				],
			},
		});

		expect(wrapper.classes()).toContain('sy-menu-horizontal');
		expect(wrapper.attributes('style')).toContain('--menu-item-justify: center;');
		expect(wrapper.find('.sy-submenu-popup').exists()).toBe(true);
		expect(wrapper.find('.sy-submenu-inline').exists()).toBe(false);
	});
});
