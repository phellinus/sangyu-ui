import { defineComponent } from 'vue';
import { HeaderProps } from './interface';

export const Header = defineComponent<HeaderProps>({
	name: 'Header',
	setup(props = { columns: [] }) {
		return () => {
			const renderColumns = () => {
				return props.columns.map((column) => {
					return <th>{column.title}</th>;
				});
			};
			return (
				<thead>
					<tr>{renderColumns()}</tr>
				</thead>
			);
		};
	},
});
