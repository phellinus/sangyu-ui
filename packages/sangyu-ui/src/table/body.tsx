import { defineComponent } from 'vue';
import { BodyProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export const Body = defineComponent<BodyProps>({
	name: 'Body',
	setup(props = { columns: [], data: [] }) {
		const { c, cm } = useClassnames('table');
		return () => {
			const { columns, data } = props;
			const cellCls = {
				[c('cell')]: true,
				[c('body-cell')]: true,
			};
			const renderCell = (row: any, rowIndex: number) => {
				return columns?.map((v) => {
					const style = {
						'--width': v.width ? v.width + 'px' : 'auto',
					};
					const alignCls = {
						[c(cm('body-cell-' + v.align))]: true,
					};

					const scope = { row, column: v, $index: rowIndex };
					const content = v.slots?.default ? v.slots.default(scope) : row[v.key];

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
