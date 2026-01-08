import { defineComponent } from 'vue';
import { BodyProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export const Body = defineComponent<BodyProps>({
	name: 'Body',
	setup(props = { columns: [], data: [] }) {
		const { c, cm } = useClassnames('table');
		return () => {
			const { columns, data } = props;
			const renderCell = (row: any, rowIndex: number) => {
				return columns?.map((column) => {
					const style: Record<string, string> = {
						'--width': column.width ? column.width + 'px' : 'auto',
					};
					if (column.fixed) {
						style['--fixed-left'] = `${(column as any).__fixedLeft ?? 0}px`;
					}
					const alignType = column.align ?? 'left';
					const alignCls = {
						[c(cm('body-cell-' + alignType))]: true,
					};
					const cellCls = {
						[c('cell')]: true,
						[c('body-cell')]: true,
						[c(cm('cell-fixed'))]: !!column.fixed,
					};

					const scope = { row, column, $index: rowIndex };
					const content = column.slots?.default ? column.slots.default(scope) : row[column.key];

					return (
						<td class={cellCls} style={style}>
							<div class={alignCls}>{content}</div>
						</td>
					);
				});
			};
			const rowCls = {
				[c('body-row')]: true,
			};
			const renderData = () => {
				return data?.map((row, rowIndex) => {
					return <tr class={rowCls}>{renderCell(row, rowIndex)}</tr>;
				});
			};
			const cls = {
				[c('body')]: true,
			};
			return <tbody class={cls}>{renderData()}</tbody>;
		};
	},
});
