import { withInstall } from '@sangyu-ui/utils';

import {
	SyLayoutComponent,
	SyLayoutContentComponent,
	SyLayoutFooterComponent,
	SyLayoutHeaderComponent,
	SyLayoutSiderComponent,
} from './SyLayout';

export const SyLayoutHeader = withInstall(SyLayoutHeaderComponent);
export const SyLayoutSider = withInstall(SyLayoutSiderComponent);
export const SyLayoutContent = withInstall(SyLayoutContentComponent);
export const SyLayoutFooter = withInstall(SyLayoutFooterComponent);
export const SyLayout = withInstall(SyLayoutComponent, [
	SyLayoutHeader,
	SyLayoutSider,
	SyLayoutContent,
	SyLayoutFooter,
]);

export type * from './Layout.type';
export default SyLayout;
