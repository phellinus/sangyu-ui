import { defineComponent } from 'vue';
import { TableProps } from './interface';
import { Header } from './header';
import { Body } from './body';

export default defineComponent(
	(props: TableProps, { slots }) => {
		return () => {
			const { columns, data } = props;
			return (
				<div>
					<table>
						<Header columns={columns} v-slots={slots}></Header>
						<Body columns={columns} data={data} />
					</table>
				</div>
			);
		};
	},
	{
		name: 'SyTable',
	},
);
