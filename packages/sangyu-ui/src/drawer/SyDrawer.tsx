import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SyDrawer',
	inheritAttrs: false,
	props: {
		visible: Boolean,
		title: String,
	},
	emits: ['update:visible'],
	setup(props, { emit }) {
		return () => {
			return <div>123</div>;
		};
	},
});
