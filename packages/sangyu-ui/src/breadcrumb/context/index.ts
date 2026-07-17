import type { InjectionKey } from 'vue';
import type { BreadcrumbContext } from '../Breadcrumb.type';

/** breadcrumbKey */
export const breadcrumbContextKey: InjectionKey<BreadcrumbContext> = Symbol('SyBreadcrumbContext');
