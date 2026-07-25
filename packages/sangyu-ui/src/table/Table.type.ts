import type { CSSProperties, VNodeChild } from 'vue';

// 使用 object，避免要求 UserRow 必须声明字符串索引签名
export type TableRecord = object;

// 使用双变函数类型，允许不同数据行泛型之间传递回调
export type TableCallback<Args, Result> = {
	bivarianceHack(args: Args): Result;
}['bivarianceHack'];

export type TableAlign = 'left' | 'center' | 'right';
export type TableFixed = boolean | 'left' | 'right';
export type TableSize = 'small' | 'middle' | 'large';
export type TableRowKey = string | number;
export type TableDataIndex = string | number | readonly (string | number)[];

export interface TableHeaderRender {
	column: TableColumn<any>;
}

export interface TableCellRender<RecordType extends object = TableRecord> {
	text: unknown;
	value: unknown;
	record: RecordType;
	row: RecordType;
	column: TableColumn<RecordType>;
	index: number;
	rowIndex: number;
}

export interface TableColumnSlots<RecordType extends object = TableRecord> {
	default?: TableCallback<TableCellRender<RecordType>, VNodeChild>;

	title?: TableCallback<TableHeaderRender, VNodeChild>;
}

export interface TableColumn<RecordType extends object = any> {
	title?: VNodeChild | TableCallback<TableHeaderRender, VNodeChild>;

	key?: string | number;

	dataIndex?: TableDataIndex;

	width?: number | string;

	minWidth?: number | string;

	align?: TableAlign;

	fixed?: TableFixed;

	ellipsis?: boolean;

	headerClassName?: string;

	className?: string;

	customRender?: TableCallback<TableCellRender<RecordType>, VNodeChild>;

	slots?: TableColumnSlots<RecordType>;
}

export interface InternalTableColumn<RecordType extends object = any> extends Omit<TableColumn<RecordType>, 'fixed'> {
	fixed?: 'left' | 'right';
	__key: string;
	__left?: number;
	__right?: number;
	__lastFixedLeft?: boolean;
	__firstFixedRight?: boolean;
}

export interface TableScroll {
	x?: number | string | true;
	y?: number | string;
}

export interface TableProps<RecordType extends object = any> {
	columns?: TableColumn<RecordType>[];
	dataSource?: RecordType[];
	data?: RecordType[];
	rowKey?: string | ((record: RecordType, index: number) => TableRowKey);
	scroll?: TableScroll;
	loading?: boolean;
	emptyText?: string;
	bordered?: boolean;
	striped?: boolean;
	size?: TableSize;
	rowClassName?: string | ((record: RecordType, index: number) => string);
	customStyle?: string | CSSProperties;
}
