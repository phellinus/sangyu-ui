import type { App } from 'vue';
import SyBreadCrumb from './SyBreadcrumb';
import { SyBreadcrumbItem } from './components';

type InstallableBreadcrumb = typeof SyBreadCrumb & {
	install: (app: App) => void;
};

const Breadcrumb = SyBreadCrumb as InstallableBreadcrumb;

Breadcrumb.install = (app: App) => {
	app.component('SyBreadCrumb', Breadcrumb);
	app.component('SyBreadcrumbItem', SyBreadcrumbItem);
};

export { Breadcrumb as SyBreadCrumb, SyBreadcrumbItem };
export * from './Breadcrumb.type';

export default Breadcrumb;
