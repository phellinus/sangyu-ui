export interface ColumnType {
	title: string;
	key: string;
	width?: number;
	align?: 'left' | 'center' | 'right';
}

export interface HeaderProps {
	columns: ColumnType[];
}

export interface TableProps {
	columns?: any[];
	data?: any[];
}

export interface BodyProps {
	columns?: ColumnType[];
	data?: any[];
}
