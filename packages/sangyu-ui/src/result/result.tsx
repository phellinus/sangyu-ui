import { defineComponent } from 'vue';

export default defineComponent(
	(props, { slots }) => {
		return () => {
			return <div class='sy-result'>{slots.default?.()}</div>;
		};
	},
	{
		name: 'SyResult',
	},
);
