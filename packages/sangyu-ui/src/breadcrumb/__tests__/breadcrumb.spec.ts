import { mount } from '@vue/test-utils';
import { Fragment, h } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import SyBreadCrumb from '../breadcrumb';
import SyBreadcrumbItem from '../breadcrumbItem';

describe('SyBreadCrumb', () => {
	it('renders breadcrumb items with separators and last-item state', () => {
		const wrapper = mount(SyBreadCrumb, {
			props: {
				separator: '>',
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
		expect(warnSpy).toHaveBeenCalledWith('[SyBreadCrumb] 子组件只能是 SangyuBreadcrumbItem');

		warnSpy.mockRestore();
	});
});
