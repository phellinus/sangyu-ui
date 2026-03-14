import { App } from 'vue';
import SyBreadCrumb from './breadcrumb';

(SyBreadCrumb as any).install = (app: App) => {
	app.component(SyBreadCrumb.name, SyBreadCrumb);
};

export default SyBreadCrumb;
