import { defineComponent } from 'vue';
import { HeaderProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export const Header = defineComponent<HeaderProps>({
	name: 'Header',
	setup(props) {
		const { c, cm } = useClassnames('table');
		return () => {
			const columns = props.columns ?? [];
			const fixed = props.fixedHeader;
			const renderColumns = () => {
				return columns.map((column) => {
					const cellCls = {
						[c('cell')]: true,
						[c('header-cell')]: true,
						[c(cm('header-cell-fixed'))]: !!fixed,
						[c(cm('cell-fixed'))]: !!column.fixed,
					};
					const style: Record<string, string> = {};
					if (column.width) {
						style.width = column.width + 'px';
					}
					if (column.fixed) {
						style['--fixed-left'] = `${(column as any).__fixedLeft ?? 0}px`;
					}
					return (
						<th class={cellCls} style={style}>
							{column.title}
						</th>
					);
				});
			};
			const rowCls = {
				[c('header-row')]: true,
			};
			const cls = {
				[c('header')]: true,
				[c(cm('header-fixed'))]: !!fixed,
			};
			return (
				<thead class={cls}>
					<tr class={rowCls}>{renderColumns()}</tr>
				</thead>
			);
		};
	},
});
