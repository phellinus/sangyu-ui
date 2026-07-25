import { defineComponent, type CSSProperties, type PropType, type VNodeChild } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { InternalTableColumn, TableHeaderRender } from '../Table.type';
import TableColGroup from './TableColGroup';

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
	name: 'SyTableHeader',
	props: {
		columns: {
			type: Array as PropType<InternalTableColumn[]>,
			default: () => [],
		},
		tableStyle: {
			type: Object as PropType<CSSProperties>,
		},
	},
	setup(props, { slots }) {
		const { c, cm } = useClassnames('table');

		const renderTitle = (column: InternalTableColumn): VNodeChild => {
			const scope: TableHeaderRender = { column };

			if (column.slots?.title) return column.slots.title(scope);
			if (slots.headerCell) return slots.headerCell(scope);

			return typeof column.title === 'function' ? column.title(scope) : column.title;
		};

		return () => (
			<table class={[c(), c('header-table')]} style={props.tableStyle}>
				<TableColGroup columns={props.columns} />

				<thead class={c('header')}>
					<tr class={c('header-row')}>
						{props.columns.map((column) => (
							<th
								key={column.__key}
								scope='col'
								class={[
									c('cell'),
									c('header-cell'),
									column.headerClassName,
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
								<div class={c('cell-content')}>{renderTitle(column)}</div>
							</th>
						))}
					</tr>
				</thead>
			</table>
		);
	},
});
