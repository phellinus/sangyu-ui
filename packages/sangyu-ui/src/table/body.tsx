import { defineComponent } from 'vue';
import { BodyProps } from './interface';

export const Body = defineComponent<BodyProps>({
	name: 'Body',
	setup(props = { columns: [], data: [] }) {
		return () => {
			const { columns, data } = props;
			const renderCell = (item: any) => {
				return columns?.map((v) => {
					return <td>{item[v.key]}</td>;
				});
			};
			const renderData = () => {
				return data?.map((v) => {
					return <tr>{renderCell(v)}</tr>;
				});
			};
			return <tbody>{renderData()}</tbody>;
		};
	},
});
