import { defineComponent } from 'vue';
import { HeaderProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export const Header = defineComponent<HeaderProps>({
	name: 'Header',
	setup(props = { columns: [] }) {
		const { c } = useClassnames('table');
		return () => {
			const cellCls = {
				[c('cell')]: true,
				[c('header-cell')]: true,
			};
			const renderColumns = () => {
				return (props.columns ?? []).map((column) => {
					return <th class={cellCls}>{column.title}</th>;
				});
			};
			const rowCls = {
				[c('header-row')]: true,
			};
			const cls = {
				[c('header')]: true,
			};
			return (
				<thead class={cls}>
					<tr class={rowCls}>{renderColumns()}</tr>
				</thead>
			);
		};
	},
});
