import { defineComponent, type CSSProperties, type PropType, type VNodeChild } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import { getValueByDataIndex } from '../helpers';
import type { InternalTableColumn, TableCellRender, TableRecord, TableRowKey } from '../Table.type';
import TableColGroup from './TableColGroup';
import TableEmpty from './TableEmpty';

function getFixedStyle(column: InternalTableColumn): CSSProperties {
	if (column.fixed === 'left') {
		return { '--sy-table-fixed-left': `${column.__left ?? 0}px` };
	}

	if (column.fixed === 'right') {
		return { '--sy-table-fixed-right': `${column.__right ?? 0}px` };
	}

	return {};
}

export default defineComponent({
	name: 'SyTableBody',
	props: {
		columns: {
			type: Array as PropType<InternalTableColumn[]>,
			default: () => [],
		},
		dataSource: {
			type: Array as PropType<TableRecord[]>,
			default: () => [],
		},
		rowKey: {
			type: [String, Function] as PropType<string | ((record: TableRecord, index: number) => TableRowKey)>,
			default: 'key',
		},
		rowClassName: {
			type: [String, Function] as PropType<string | ((record: TableRecord, index: number) => string)>,
		},
		emptyText: {
			type: String,
			default: '暂无数据',
		},
		tableStyle: {
			type: Object as PropType<CSSProperties>,
		},
		onRowClick: {
			type: Function as PropType<(record: TableRecord, index: number, event: MouseEvent) => void>,
		},
	},
	setup(props, { slots }) {
		const { c, cm } = useClassnames('table');

		const resolveRowKey = (record: TableRecord, index: number): TableRowKey => {
			if (typeof props.rowKey === 'function') {
				return props.rowKey(record, index);
			}

			const value = getValueByDataIndex(record, props.rowKey);
			return typeof value === 'string' || typeof value === 'number' ? value : index;
		};

		const renderCell = (record: TableRecord, column: InternalTableColumn, rowIndex: number): VNodeChild => {
			const text = getValueByDataIndex(record, column.dataIndex);

			const scope: TableCellRender = {
				text,
				value: text,
				record,
				row: record,
				column,
				index: rowIndex,
				rowIndex,
			};

			// 列自己的插槽优先级最高
			if (column.slots?.default) return column.slots.default(scope);
			if (column.customRender) return column.customRender(scope);
			if (slots.bodyCell) return slots.bodyCell(scope);

			return text as VNodeChild;
		};

		return () => (
			<table class={[c(), c('body-table')]} style={props.tableStyle}>
				<TableColGroup columns={props.columns} />

				<tbody class={c('body')}>
					{props.dataSource.length === 0 ? (
						<tr class={c('empty-row')}>
							<td colspan={Math.max(props.columns.length, 1)}>
								<TableEmpty text={props.emptyText} v-slots={{ default: slots.empty }} />
							</td>
						</tr>
					) : (
						props.dataSource.map((record, rowIndex) => {
							const customRowClass =
								typeof props.rowClassName === 'function'
									? props.rowClassName(record, rowIndex)
									: props.rowClassName;

							return (
								<tr
									key={resolveRowKey(record, rowIndex)}
									class={[c('body-row'), customRowClass]}
									onClick={(event) => props.onRowClick?.(record, rowIndex, event)}
								>
									{props.columns.map((column) => (
										<td
											key={column.__key}
											class={[
												c('cell'),
												c('body-cell'),
												column.className,
												{
													[c('cell', cm('fixed-left'))]: column.fixed === 'left',
													[c('cell', cm('fixed-right'))]: column.fixed === 'right',
													[c('cell', cm('last-fixed-left'))]: !!column.__lastFixedLeft,
													[c('cell', cm('first-fixed-right'))]: !!column.__firstFixedRight,
													[c('cell', cm('ellipsis'))]: !!column.ellipsis,
												},
											]}
											style={{
												textAlign: column.align ?? 'left',
												...getFixedStyle(column),
											}}
										>
											<div class={c('cell-content')}>{renderCell(record, column, rowIndex)}</div>
										</td>
									))}
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		);
	},
});
