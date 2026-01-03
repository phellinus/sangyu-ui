import { defineComponent } from 'vue';
import { BodyProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export const Body = defineComponent<BodyProps>({
	name: 'Body',
	setup(props = { columns: [], data: [] }) {
		const { c } = useClassnames('table');
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
					return (
						<td class={cellCls} style={style}>
							{item[v.key]}
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
