import { defineComponent, type PropType } from 'vue';
import type { TabName, TabPaneProps } from '../Tabs.type';

/** 渲染与导航项建立 ARIA 关联的标签面板 */
export const SyTabPane = defineComponent({
	name: 'SyTabPane',
	props: {
		name: { type: [String, Number] as PropType<TabName>, required: true },
		label: { type: String, default: undefined },
		title: { type: String, default: undefined },
		disabled: { type: Boolean, default: false },
		closable: { type: Boolean, default: true },
		icon: { type: null as unknown as PropType<TabPaneProps['icon']>, default: undefined },
		iconPosition: { type: String as PropType<TabPaneProps['iconPosition']>, default: 'left' },
		active: { type: Boolean, default: false },
		panelId: { type: String, default: '' },
		tabId: { type: String, default: '' },
	},
	setup(props, { slots }) {
		// 非活动面板保留挂载，仅切换可见性和键盘焦点顺序
		return () => (
			<div
				id={props.panelId}
				role='tabpanel'
				aria-labelledby={props.tabId}
				hidden={!props.active}
				tabindex={props.active ? 0 : -1}
			>
				{slots.default?.()}
			</div>
		);
	},
});
