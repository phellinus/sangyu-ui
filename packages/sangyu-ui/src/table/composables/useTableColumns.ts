import { filterEmpty, isBaseType } from '@v-c/utils';
import { isVNode, type Slots } from 'vue';
import type { InternalTableColumn, TableColumn, TableColumnSlots, TableRecord } from '../Table.type';

function getPixelWidth(width?: number | string): number {
	if (typeof width === 'number') return width;

	if (typeof width === 'string' && /^\d+(\.\d+)?px$/.test(width.trim())) {
		return Number.parseFloat(width);
	}

	return 0;
}

function collectSlotColumns<RecordType extends object>(slots: Slots): TableColumn<RecordType>[] {
	const children = filterEmpty(slots.default?.());

	return children.reduce<TableColumn<RecordType>[]>((columns, child) => {
		if (isBaseType(child) || !isVNode(child)) return columns;

		const component = child.type as { name?: string; displayName?: string };
		const isTableColumn = component.name === 'SyTableColumn' || component.displayName === 'SyTableColumn';

		if (!isTableColumn) return columns;

		const column = {
			...(child.props ?? {}),
			key: child.key ?? child.props?.key,
			slots: typeof child.children === 'object' ? (child.children as TableColumnSlots<RecordType>) : undefined,
		} as TableColumn<RecordType>;

		columns.push(column);
		return columns;
	}, []);
}

export function normalizeTableColumns<RecordType extends object = TableRecord>(
	propColumns: TableColumn<RecordType>[] | undefined,
	slots: Slots,
): InternalTableColumn<RecordType>[] {
	// columns 属性优先级高于默认插槽声明的列
	const source = propColumns && propColumns.length > 0 ? propColumns : collectSlotColumns<RecordType>(slots);

	const columns = source.map<InternalTableColumn<RecordType>>((column, index) => {
		const fixed =
			column.fixed === true
				? 'left'
				: column.fixed === 'left' || column.fixed === 'right'
					? column.fixed
					: undefined;

		const dataKey = Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex;

		return {
			...column,
			fixed,
			__key: String(column.key ?? dataKey ?? index),
		};
	});

	let leftOffset = 0;

	columns.forEach((column) => {
		if (column.fixed !== 'left') return;

		column.__left = leftOffset;
		leftOffset += getPixelWidth(column.width);
	});

	let rightOffset = 0;

	columns
		.slice()
		.reverse()
		.forEach((column) => {
			if (column.fixed !== 'right') return;

			column.__right = rightOffset;
			rightOffset += getPixelWidth(column.width);
		});

	const leftColumns = columns.filter((column) => column.fixed === 'left');
	const rightColumns = columns.filter((column) => column.fixed === 'right');

	if (leftColumns.length > 0) {
		leftColumns[leftColumns.length - 1].__lastFixedLeft = true;
	}

	if (rightColumns.length > 0) {
		rightColumns[0].__firstFixedRight = true;
	}

	return columns;
}

export function getColumnsPixelWidth(columns: InternalTableColumn[]): number {
	return columns.reduce((total, column) => total + getPixelWidth(column.width), 0);
}
