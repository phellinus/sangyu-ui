import { defineComponent, h, type PropType } from 'vue';

import type { LayoutContentProps, LayoutSiderProps } from './Layout.type';

/** 页面布局容器 */
export const SyLayoutComponent = defineComponent({
	name: 'SyLayout',
	setup(_, { slots }) {
		return () => h('div', { class: 'sy-layout' }, slots.default?.());
	},
});

/** 布局顶部区域 */
export const SyLayoutHeaderComponent = defineComponent({
	name: 'SyLayoutHeader',
	setup(_, { slots }) {
		return () => h('header', { class: 'sy-layout-header' }, slots.default?.());
	},
});

/** 布局侧栏 */
export const SyLayoutSiderComponent = defineComponent({
	name: 'SyLayoutSider',
	props: {
		width: { type: [Number, String] as PropType<LayoutSiderProps['width']>, default: undefined },
	},
	setup(props, { slots }) {
		return () =>
			h(
				'aside',
				{
					class: 'sy-layout-sider',
					style:
						props.width === undefined
							? undefined
							: {
									'--sy-layout-sider-custom-width':
										typeof props.width === 'number' ? `${props.width}px` : props.width,
								},
				},
				slots.default?.(),
			);
	},
});

/** 布局主要内容区 */
export const SyLayoutContentComponent = defineComponent({
	name: 'SyLayoutContent',
	props: {
		as: { type: String as PropType<LayoutContentProps['as']>, default: 'main' },
	},
	setup(props, { slots }) {
		return () => h(props.as, { class: 'sy-layout-content' }, slots.default?.());
	},
});

/** 布局底部区域 */
export const SyLayoutFooterComponent = defineComponent({
	name: 'SyLayoutFooter',
	setup(_, { slots }) {
		return () => h('footer', { class: 'sy-layout-footer' }, slots.default?.());
	},
});
