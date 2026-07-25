import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import SyTable from '../SyTable';
import { TableColumn } from '../components';

describe('SyTable', () => {
	it('renders from columns and data with fixed header sizing', () => {
		const wrapper = mount(SyTable, {
			props: {
				scroll: { y: 240 },
				columns: [
					{ title: '姓名', key: 'name', dataIndex: 'name', width: 120 },
					{ title: '状态', key: 'status', dataIndex: 'status', width: 80, align: 'center' },
				],
				dataSource: [{ name: '张三', status: '进行中' }],
			},
		});

		expect(wrapper.classes()).toContain('sy-table-wrapper');
		expect(wrapper.classes()).toContain('sy-table--scroll-y');
		expect(wrapper.find('.sy-table-header-viewport').exists()).toBe(true);
		expect(wrapper.find('.sy-table-body-viewport').attributes('style')).toContain('max-height: 240px;');
		expect(wrapper.findAll('.sy-table-header-cell')).toHaveLength(2);
		expect(wrapper.findAll('.sy-table-body-row')).toHaveLength(1);
		expect(wrapper.text()).toContain('张三');
		expect(wrapper.text()).toContain('进行中');
		expect(wrapper.findAll('.sy-table-body-cell').map((cell) => cell.text())).toContain('进行中');
	});

	it('collects table-column children, scoped slots and fixed column styles', () => {
		const wrapper = mount(SyTable, {
			props: {
				dataSource: [{ name: '李四', action: '查看' }],
			},
			slots: {
				default: () => [
					h(TableColumn as any, {
						title: '姓名',
						dataIndex: 'name',
						key: 'name',
						width: 120,
						fixed: true,
					}),
					h(
						TableColumn as any,
						{
							title: '操作',
							dataIndex: 'action',
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
		expect(wrapper.find('.sy-table-cell--fixed-left').exists()).toBe(true);
		const fixedCells = wrapper.findAll('.sy-table-cell--fixed-left');
		expect(fixedCells.length).toBeGreaterThan(0);
		expect(fixedCells[0].attributes('style')).toContain('--sy-table-fixed-left: 0px;');
		expect(wrapper.find('.sy-table-body-table').attributes('style')).toContain('min-width: 220px;');
	});
});
