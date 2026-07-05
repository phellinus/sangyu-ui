import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import SyPagination from '../SyPagination';

describe('SyPagination', () => {
	it('renders modifier classes, custom style and default collapsed pager', async () => {
		const wrapper = mount(SyPagination, {
			props: {
				defaultCurrentPage: 3,
				total: 120,
				size: 'large',
				shape: 'circle',
				color: '#0ea5e9',
				customStyle: 'margin-top: 8px;',
				layout: 'prev, pager, next',
			},
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.classes()).toEqual(
			expect.arrayContaining(['sy-pagination', 'sy-pagination-large', 'sy-pagination-circle']),
		);
		expect(wrapper.attributes('style')).toContain('margin-top: 8px;');
		expect(wrapper.attributes('style')).toContain('--sy-pagination-active-color: #0ea5e9;');
		expect(wrapper.attributes('role')).toBe('navigation');
		expect(wrapper.attributes('aria-label')).toBe('pagination');
		expect(wrapper.findAll('.sy-pager-button').map((button) => button.attributes('data-page'))).toEqual([
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'12',
		]);
		expect(wrapper.find('.sy-pager-aria-active').text()).toBe('3');
	});

	it('emits page update and pageChange when clicking a page', async () => {
		const onPageChange = vi.fn();
		const wrapper = mount(SyPagination, {
			props: {
				defaultCurrentPage: 1,
				pageCount: 5,
				layout: 'prev, pager, next',
				onPageChange,
			},
		});

		await wrapper.get('[data-page="2"]').trigger('click');

		expect(wrapper.emitted('update:currentPage')).toEqual([[2]]);
		expect(wrapper.emitted('pageChange')).toEqual([[2]]);
		expect(onPageChange).toHaveBeenCalledWith(2);
		expect(wrapper.find('.sy-pager-aria-active').text()).toBe('2');
	});

	it('uses prev and next buttons with boundary disabled state', async () => {
		const wrapper = mount(SyPagination, {
			props: {
				defaultCurrentPage: 1,
				pageCount: 3,
				layout: 'prev, pager, next',
			},
		});

		expect(wrapper.get('.sy-pagination-prev').attributes('disabled')).toBeDefined();
		expect(wrapper.get('.sy-pagination-next').attributes('disabled')).toBeUndefined();

		await wrapper.get('.sy-pagination-next').trigger('click');

		expect(wrapper.emitted('update:currentPage')).toEqual([[2]]);
		expect(wrapper.emitted('nextClick')).toEqual([[2]]);
		expect(wrapper.get('.sy-pagination-prev').attributes('disabled')).toBeUndefined();
	});

	it('skips disabled and loading pages when moving with next', async () => {
		const wrapper = mount(SyPagination, {
			props: {
				defaultCurrentPage: 1,
				pageCount: 6,
				disabledItems: [2],
				loadingItems: [3],
				layout: 'prev, pager, next',
			},
		});

		expect(wrapper.get('[data-page="2"]').classes()).toContain('sy-pager-disabled');
		expect(wrapper.get('[data-page="3"]').classes()).toContain('sy-pager-loading');

		await wrapper.get('.sy-pagination-next').trigger('click');

		expect(wrapper.emitted('update:currentPage')).toEqual([[4]]);
		expect(wrapper.find('.sy-pager-aria-active').text()).toBe('4');
	});

	it('supports infinite navigation between first and last page', async () => {
		const wrapper = mount(SyPagination, {
			props: {
				defaultCurrentPage: 1,
				pageCount: 5,
				infinite: true,
				layout: 'prev, pager, next',
			},
		});

		expect(wrapper.get('.sy-pagination-prev').attributes('disabled')).toBeUndefined();

		await wrapper.get('.sy-pagination-prev').trigger('click');

		expect(wrapper.emitted('update:currentPage')).toEqual([[5]]);
		expect(wrapper.emitted('prevClick')).toEqual([[5]]);
		expect(wrapper.find('.sy-pager-aria-active').text()).toBe('5');
	});

	it('renders sizes, jumper, total and slot layout items', async () => {
		const onSizeChange = vi.fn();
		const wrapper = mount(SyPagination, {
			props: {
				defaultCurrentPage: 2,
				defaultPageSize: 10,
				total: 100,
				pageSizes: [10, 20, 50],
				layout: 'total, sizes, prev, pager, next, jumper, slot',
				onSizeChange,
			},
			slots: {
				default: ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) =>
					`第 ${currentPage} 页，每页 ${pageSize} 条`,
			},
		});

		expect(wrapper.get('.sy-pagination-total').text()).toBe('共 100 条');
		expect(wrapper.get('.sy-pagination-sizes').exists()).toBe(true);
		expect(wrapper.get('.sy-pagination-jumper-input').exists()).toBe(true);
		expect(wrapper.text()).toContain('第 2 页，每页 10 条');

		await wrapper.get('select').setValue('20');

		expect(wrapper.emitted('update:pageSize')).toEqual([[20]]);
		expect(wrapper.emitted('sizeChange')).toEqual([[20]]);
		expect(onSizeChange).toHaveBeenCalledWith(20);

		await wrapper.get('.sy-pagination-jumper-input').setValue('5');
		await wrapper.get('.sy-pagination-jumper-input').trigger('keydown', { key: 'Enter' });

		expect(wrapper.emitted('update:currentPage')?.at(-1)).toEqual([5]);
	});

	it('renders dotted and progress modes', async () => {
		const wrapper = mount(SyPagination, {
			props: {
				defaultCurrentPage: 4,
				pageCount: 10,
				buttonsDotted: true,
				progress: true,
				layout: 'prev, pager, next',
			},
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.classes()).toContain('sy-pagination-buttons-dotted');
		expect(wrapper.find('.sy-pagination-progress').exists()).toBe(true);
		expect(wrapper.find('.sy-pagination-progress-bar').attributes('style')).toContain('width: 40%');
		expect(wrapper.find('.sy-pager-aria-active').text()).toBe('');
	});

	it('hides itself on single page when hideOnSinglePage is true', () => {
		const wrapper = mount(SyPagination, {
			props: {
				total: 5,
				hideOnSinglePage: true,
			},
		});

		expect(wrapper.html()).toBe('');
	});
});
