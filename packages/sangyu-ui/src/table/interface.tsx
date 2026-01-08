import type { Slots } from 'vue';

export interface ColumnType {
	title: string;
	key: string;
	width?: number;
	align?: 'left' | 'center' | 'right';
	slots?: Slots;
	fixed?: boolean;
}

export interface HeaderProps {
	columns: ColumnType[];
	fixedHeader?: boolean;
}

export interface TableProps {
	columns?: ColumnType[];
	data?: any[];
	height?: number | string;
}

export interface BodyProps {
	columns?: ColumnType[];
	data?: any[];
}
