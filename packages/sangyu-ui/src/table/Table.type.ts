import type { CSSProperties, VNodeChild } from 'vue';

export type TableRecord = Record<string, unknown>;
export type TableAlign = 'left' | 'center' | 'right';
export type TableFixed = boolean | 'left' | 'right';
export type TableSize = 'small' | 'middle' | 'large';
export type TableRowKey = string | number;
export type TableDataIndex = string | number | readonly (string | number)[];

export interface TableScroll {
	// 横向滚动宽度，true 表示根据内容宽度展开
	x?: number | string | true;

	// 表体最大高度，不包含表头高度
	y?: number | string;
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

export interface TableHeaderRender<RecordType extends object = TableRecord> {
	column: TableColumn<RecordType>;
}

export interface TableColumnSlots<RecordType extends object = TableRecord> {
	default?: (scope: TableCellRender<RecordType>) => VNodeChild;
	title?: (scope: TableHeaderRender<RecordType>) => VNodeChild;
}

export interface TableColumn<RecordType extends object = TableRecord> {
	// 表头显示内容
	title?: VNodeChild | ((scope: TableHeaderRender<RecordType>) => VNodeChild);

	// 列唯一标识
	key?: string | number;

	// 数据字段路径，支持 user.name 或 ['user', 'name']
	dataIndex?: TableDataIndex;

	// 列宽，固定列建议使用数字或 px
	width?: number | string;

	// 最小列宽
	minWidth?: number | string;

	// 单元格对齐方式
	align?: TableAlign;

	// 固定列，true 等同于 left
	fixed?: TableFixed;

	// 是否单行省略
	ellipsis?: boolean;

	// 自定义表头类名
	headerClassName?: string;

	// 自定义表体单元格类名
	className?: string;

	// 配置式自定义单元格渲染
	customRender?: (scope: TableCellRender<RecordType>) => VNodeChild;

	// SyTableColumn 声明式插槽
	slots?: TableColumnSlots<RecordType>;
}

export interface InternalTableColumn<RecordType extends object = TableRecord>
	extends Omit<TableColumn<RecordType>, 'fixed'> {
	fixed?: 'left' | 'right';
	__key: string;
	__left?: number;
	__right?: number;
	__lastFixedLeft?: boolean;
	__firstFixedRight?: boolean;
}

export interface TableProps<RecordType extends object = TableRecord> {
	columns?: TableColumn<RecordType>[];

	// 推荐使用 dataSource，命名与 Ant Design Vue 保持一致
	dataSource?: RecordType[];

	// 兼容当前组件的 data 属性
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

export interface TableEmits<RecordType extends object = TableRecord> {
	(event: 'rowClick', record: RecordType, index: number, mouseEvent: MouseEvent): void;
}
