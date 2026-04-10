import { defineComponent } from 'vue';

export default defineComponent(
	(props, { slots }) => {
		return () => {
			return <div class='sy-steps'>{slots.default?.()}</div>;
		};
	},
	{
		name: 'SySteps',
	},
);
