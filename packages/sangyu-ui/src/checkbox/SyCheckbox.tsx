import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SyCheckbox',
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		customStyle: {
			type: String,
			default: '',
		},
	},

	setup(props, { slots }) {
		return () => {
			<>
				<div style={props.customStyle}>{slots.default?.()}</div>
			</>;
		};
	},
});
