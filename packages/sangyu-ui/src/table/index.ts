import type { App } from 'vue';
import SyTable from './table';

(SyTable as any).install = (app: App) => {
	app.component(SyTable.name, SyTable);
};

export default SyTable;
