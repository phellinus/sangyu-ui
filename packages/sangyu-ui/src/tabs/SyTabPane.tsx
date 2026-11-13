import { defineComponent, type PropType } from 'vue';
import type { TabName } from './Tabs.type';

export const SyTabPane = defineComponent({
	name: 'SyTabPane',
	props: {
		name: { type: [String, Number] as PropType<TabName>, required: true },
		label: { type: String, default: '' },
		disabled: { type: Boolean, default: false },
		active: { type: Boolean, default: false },
		panelId: { type: String, default: '' },
		tabId: { type: String, default: '' },
	},
	setup(props, { slots }) {
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
