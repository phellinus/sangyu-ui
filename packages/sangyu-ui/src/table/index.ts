import type { App } from 'vue';
import SyTable from './table';
import { TableColumn } from './table-column';

(SyTable as any).install = (app: App) => {
	app.component(SyTable.name || 'SyTable', SyTable);
	app.component(TableColumn.displayName, TableColumn);
};

export default SyTable;
