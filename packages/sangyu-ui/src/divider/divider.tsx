import { defineComponent } from 'vue';

export default defineComponent(
	(props, { slots }) => {
		return () => {
			return <div class='sy-divider'>{slots.default?.()}</div>;
		};
	},
	{
		name: 'SyDivider',
	},
);
