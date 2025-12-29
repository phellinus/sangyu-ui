import type { App, Plugin } from 'vue';
import SyTable from './table';

(SyTable as unknown as Plugin).install = (app: App) => {
	app.component(SyTable.name, SyTable);
};

export default SyTable;
