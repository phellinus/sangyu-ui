import { defineComponent, isVNode } from 'vue';
import { TableProps } from './interface';
import { Header } from './header';
import { Body } from './body';
import { filterEmpty, isBaseType } from '@v-c/utils';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent(
	(props: TableProps, { slots }) => {
		const { c } = useClassnames('table');
		return () => {
			const { columns, data } = props;
			const ChildrenColumns: any[] = columns ?? [];
			if (ChildrenColumns.length < 1) {
				ChildrenColumns.length = 0;
				const children = filterEmpty(slots.default?.());
				children.forEach((child) => {
					if (isBaseType(child) || !isVNode(child)) {
						return;
					}
					if (
						child.type &&
						(child as any).type.displayName &&
						(child as any).type.displayName === 'SyTableColumn'
					) {
						ChildrenColumns.push(child.props);
					}
				});
			}
			const cls = {
				[c()]: true,
			};
			return (
				<table class={cls}>
					<Header columns={ChildrenColumns} v-slots={slots}></Header>
					<Body columns={ChildrenColumns} data={data} />
				</table>
			);
		};
	},
	{
		name: 'SyTable',
	},
);
