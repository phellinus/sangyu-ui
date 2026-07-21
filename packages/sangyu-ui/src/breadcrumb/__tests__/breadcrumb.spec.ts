import { mount } from '@vue/test-utils';
import { Fragment, h } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SyBreadCrumb, SyBreadcrumbItem } from 'sangyu-ui';

afterEach(() => {
	vi.restoreAllMocks();
});

describe('SyBreadCrumb', () => {
	it('renders breadcrumb items with separators and last-item state', () => {
		const wrapper = mount(SyBreadCrumb, {
			props: {
				separator: '>',
				handleClick: vi.fn(),
			},
			slots: {
				default: () => [
					h(SyBreadcrumbItem, { to: '/home' }, () => '首页'),
					h(SyBreadcrumbItem, { to: '/docs' }, () => '文档'),
					h(SyBreadcrumbItem, null, () => '按钮'),
				],
			},
		});

		const items = wrapper.findAll('.sy-breadcrumb-item__inner');
		expect(items).toHaveLength(3);
		expect(items[0].classes()).toContain('is-link');
		expect(items[2].classes()).toContain('is-last');
		expect(items[2].classes()).not.toContain('is-link');
		expect(wrapper.findAll('.sy-breadcrumb-item__separator')).toHaveLength(2);
		expect(wrapper.text()).toContain('首页');
		expect(wrapper.text()).toContain('文档');
		expect(wrapper.text()).toContain('按钮');
		expect(wrapper.text()).toContain('>');
	});

	it('calls handleClick with the item target', async () => {
		const handleClick = vi.fn();
		const wrapper = mount(SyBreadCrumb, {
			props: {
				handleClick,
			},
			slots: {
				default: () => [
					h(SyBreadcrumbItem, { to: '/docs' }, () => '文档中心'),
					h(SyBreadcrumbItem, null, () => '当前页面'),
				],
			},
		});

		await wrapper.find('.sy-breadcrumb-item__inner').trigger('click');

		expect(handleClick).toHaveBeenCalledWith('/docs');
	});

	it('does not expose link semantics without a click handler', () => {
		const wrapper = mount(SyBreadCrumb, {
			slots: {
				default: () => [
					h(SyBreadcrumbItem, { to: '/docs' }, () => '文档中心'),
					h(SyBreadcrumbItem, null, () => '当前页面'),
				],
			},
		});

		const firstItem = wrapper.find('.sy-breadcrumb-item__inner');

		expect(firstItem.classes()).not.toContain('is-link');
		expect(firstItem.attributes('role')).toBeUndefined();
		expect(firstItem.attributes('tabindex')).toBeUndefined();
	});

	it('does not trigger the current page item when it has a target', async () => {
		const handleClick = vi.fn();
		const wrapper = mount(SyBreadCrumb, {
			props: {
				handleClick,
			},
			slots: {
				default: () => [
					h(SyBreadcrumbItem, { to: '/docs' }, () => '文档中心'),
					h(SyBreadcrumbItem, { to: '/current' }, () => '当前页面'),
				],
			},
		});

		const items = wrapper.findAll('.sy-breadcrumb-item__inner');
		const currentItem = items[1];

		expect(currentItem.classes()).toContain('is-last');
		expect(currentItem.classes()).not.toContain('is-link');
		expect(currentItem.attributes('role')).toBeUndefined();
		expect(currentItem.attributes('tabindex')).toBeUndefined();
		expect(currentItem.attributes('aria-current')).toBe('page');

		await currentItem.trigger('click');
		await currentItem.trigger('keydown', { key: 'Enter' });

		expect(handleClick).not.toHaveBeenCalled();
	});

	it('supports keyboard activation for clickable items', async () => {
		const handleClick = vi.fn();
		const wrapper = mount(SyBreadCrumb, {
			props: {
				handleClick,
			},
			slots: {
				default: () => [
					h(SyBreadcrumbItem, { to: '/docs' }, () => '文档中心'),
					h(SyBreadcrumbItem, null, () => '当前页面'),
				],
			},
		});

		const firstItem = wrapper.find('.sy-breadcrumb-item__inner');

		await firstItem.trigger('keydown', { key: 'Enter' });
		await firstItem.trigger('keydown', { key: ' ' });

		expect(handleClick).toHaveBeenNthCalledWith(1, '/docs');
		expect(handleClick).toHaveBeenNthCalledWith(2, '/docs');
	});

	it('warns for invalid children while flattening fragments', () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		const wrapper = mount(SyBreadCrumb, {
			slots: {
				default: () => [
					h(Fragment, null, [
						h(SyBreadcrumbItem, { to: '/one' }, () => '一'),
						h(SyBreadcrumbItem, { to: '/two' }, () => '二'),
					]),
					h('div', 'invalid child'),
				],
			},
		});

		expect(wrapper.findAll('.sy-breadcrumb-item')).toHaveLength(2);
		expect(warnSpy).toHaveBeenCalledWith('[SyBreadCrumb] 子组件只能是 SyBreadcrumbItem');
	});
});
