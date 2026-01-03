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
			const renderCell = (item: any) => {
				return columns?.map((v) => {
					const style = {
						'--width': v.width ? v.width + 'px' : 'auto',
					};
					const alignCls = {
						[c(cm('body-cell-' + v.align))]: true,
					};
					return (
						<td class={cellCls} style={style}>
							<div class={alignCls}>{item[v.key]}</div>
						</td>
					);
				});
			};
			const rowCls = {
				[c('body-row')]: true,
			};
			const renderData = () => {
				return data?.map((v) => {
					return <tr class={rowCls}>{renderCell(v)}</tr>;
				});
			};
			const cls = {
				[c('body')]: true,
			};
			return <tbody class={cls}>{renderData()}</tbody>;
		};
	},
});
