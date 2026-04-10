import { defineComponent } from 'vue';

export default defineComponent(
	(props, { slots }) => {
		return () => {
			return (
				<>
					<div>step</div>
				</>
			);
		};
	},
	{
		name: 'SyStep',
	},
);
