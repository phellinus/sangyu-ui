import { App } from 'vue';
import SyBreadCrumb from './breadcrumb';
import SyBreadcrumbItem from './breadcrumbItem';

(SyBreadCrumb as any).install = (app: App) => {
	app.component(SyBreadCrumb.name, SyBreadCrumb);
	app.component(SyBreadcrumbItem.name, SyBreadcrumbItem);
};

export default SyBreadCrumb;
