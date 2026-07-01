import { App } from 'vue';
import SyPagination from './SyPagination';

(SyPagination as any).install = (app: App) => {
	app.component(SyPagination.name || 'SyPagination', SyPagination);
};

export { SyPagination };
export * from './Pagination.type';
export default SyPagination;
