import { defineComponent, isVNode, PropType } from 'vue';
import { ColumnType, TableProps } from './interface';
import { Header } from './header';
import { Body } from './body';
import { filterEmpty, isBaseType } from '@v-c/utils';
import { useClassnames } from '@sangyu-ui/utils';

const addUnit = (value?: number | string) => {
	if (value === undefined || value === null) return undefined;
	return typeof value === 'number' ? `${value}px` : value;
};

type InternalColumn = ColumnType & {
	__fixedLeft?: number;
};

export default defineComponent({
	name: 'SyTable',
	props: {
		columns: {
			type: Array as PropType<TableProps['columns']>,
			default: () => [],
		},
		data: {
			type: Array as PropType<TableProps['data']>,
			default: () => [],
		},
		height: {
			type: [Number, String] as PropType<TableProps['height']>,
		},
	},
	setup(props, { slots }) {
		const { c, cm } = useClassnames('table');
		return () => {
			const { columns, data, height } = props;
			const hasFixedHeader = height !== undefined && height !== null;
			const wrapperCls = {
				[c('wrapper')]: true,
				[c(cm('wrapper-fixed'))]: hasFixedHeader,
			};
			const heightValue = addUnit(height);
			const wrapperStyle = hasFixedHeader
				? {
						height: heightValue,
						maxHeight: heightValue,
					}
				: undefined;
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
						const colSlots = (child as any).children;
						ChildrenColumns.push({
							...(child.props || {}),
							slots: colSlots,
						});
					}
				});
			}
			const normalizedColumns = (ChildrenColumns as ColumnType[]).map((column) => ({
				...column,
			})) as InternalColumn[];
			let fixedLeft = 0;
			normalizedColumns.forEach((column) => {
				if (column.fixed) {
					column.__fixedLeft = fixedLeft;
					fixedLeft += column.width ?? 0;
				} else {
					column.__fixedLeft = undefined;
				}
			});
			const tableMinWidth = normalizedColumns.reduce((total, column) => total + (column.width ?? 0), 0);
			const cls = {
				[c()]: true,
			};
			const tableStyle = tableMinWidth > 0 ? { minWidth: `${tableMinWidth}px` } : undefined;
			return (
				<div class={wrapperCls} style={wrapperStyle}>
					<table class={cls} style={tableStyle}>
						<Header columns={normalizedColumns} fixedHeader={hasFixedHeader} v-slots={slots}></Header>
						<Body columns={normalizedColumns} data={data} />
					</table>
				</div>
			);
		};
	},
});
