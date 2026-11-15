import type { DefineComponent } from 'vue';
import { withInstall } from '@sangyu-ui/utils';

import type { ComponentWithInstall } from '../Component.type';
import type { LayoutContentProps, LayoutSiderProps } from './Layout.type';
import {
	SyLayoutComponent,
	SyLayoutContentComponent,
	SyLayoutFooterComponent,
	SyLayoutHeaderComponent,
	SyLayoutSiderComponent,
} from './SyLayout';

// 收窄公开声明，避免打包后的 Vue 内部泛型泄漏到消费端
export const SyLayoutHeader = withInstall(SyLayoutHeaderComponent) as unknown as ComponentWithInstall<DefineComponent>;
export const SyLayoutSider = withInstall(SyLayoutSiderComponent) as unknown as ComponentWithInstall<
	DefineComponent<LayoutSiderProps>
>;
export const SyLayoutContent = withInstall(SyLayoutContentComponent) as unknown as ComponentWithInstall<
	DefineComponent<LayoutContentProps>
>;
export const SyLayoutFooter = withInstall(SyLayoutFooterComponent) as unknown as ComponentWithInstall<DefineComponent>;
export const SyLayout = withInstall(SyLayoutComponent, [
	SyLayoutHeader,
	SyLayoutSider,
	SyLayoutContent,
	SyLayoutFooter,
]) as unknown as ComponentWithInstall<DefineComponent>;

export type * from './Layout.type';
export default SyLayout;
