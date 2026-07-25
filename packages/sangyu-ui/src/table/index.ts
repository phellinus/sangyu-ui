import type { App } from 'vue';
import SyTableComponent from './SyTable';
import SyTableColumn from './components/TableColumn';

type SyTableInstallable = typeof SyTableComponent & {
	install: (app: App) => void;
};

const SyTable = SyTableComponent as SyTableInstallable;

SyTable.install = (app: App) => {
	app.component(SyTable.name ?? 'SyTable', SyTable);
	app.component(SyTableColumn.name ?? 'SyTableColumn', SyTableColumn);
};

export { SyTable, SyTableColumn };
export * from './Table.type';
export default SyTable;
