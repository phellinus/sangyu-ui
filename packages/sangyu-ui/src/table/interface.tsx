export interface ColumnType {
	title: string;
	key: string;
}

export interface HeaderProps {
	columns: ColumnType[];
}

export interface TableProps {
	columns: any[];
	data?: any[];
}

export interface BodyProps {
	columns: ColumnType[];
	data?: any[];
}
