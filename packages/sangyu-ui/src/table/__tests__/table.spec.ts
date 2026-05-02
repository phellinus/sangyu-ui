import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import SyTable from '../table';
import { TableColumn } from '../table-column';

describe('SyTable', () => {
	it('renders from columns and data with fixed header sizing', () => {
		const wrapper = mount(SyTable, {
			props: {
				height: 240,
				columns: [
					{ title: '姓名', key: 'name', width: 120 },
					{ title: '状态', key: 'status', width: 80, align: 'center' },
				],
				data: [{ name: '张三', status: '进行中' }],
			},
		});

		expect(wrapper.classes()).toContain('sy-table-wrapper');
		expect(wrapper.classes()).toContain('sy-table--wrapper-fixed');
		expect(wrapper.attributes('style')).toContain('height: 240px;');
		expect(wrapper.get('table').attributes('style')).toContain('min-width: 200px;');
		expect(wrapper.findAll('.sy-table-header-cell')).toHaveLength(2);
		expect(wrapper.findAll('.sy-table-body-row')).toHaveLength(1);
		expect(wrapper.text()).toContain('张三');
		expect(wrapper.text()).toContain('进行中');
		expect(wrapper.find('.sy-table--body-cell-center').text()).toBe('进行中');
	});

	it('collects table-column children, scoped slots and fixed column styles', () => {
		const wrapper = mount(SyTable, {
			props: {
				data: [{ name: '李四', action: '查看' }],
			},
			slots: {
				default: () => [
					h(TableColumn as any, {
						title: '姓名',
						key: 'name',
						width: 120,
						fixed: true,
					}),
					h(
						TableColumn as any,
						{
							title: '操作',
							key: 'action',
							width: 100,
						},
						{
							default: ({ row }: any) => h('button', { class: 'action-btn' }, row.name),
						},
					),
				],
			},
		});

		expect(wrapper.find('.action-btn').text()).toBe('李四');
		expect(wrapper.find('.sy-table--header-cell-fixed').exists()).toBe(false);
		const fixedCells = wrapper.findAll('.sy-table--cell-fixed');
		expect(fixedCells.length).toBeGreaterThan(0);
		expect(fixedCells[0].attributes('style')).toContain('--fixed-left: 0px;');
		expect(wrapper.get('table').attributes('style')).toContain('min-width: 220px;');
	});
});
