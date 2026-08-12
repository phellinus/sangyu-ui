import { useClassnames } from '@sangyu-ui/utils';
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
		const { c } = useClassnames('drawer');
		return () => {
			return <div>123</div>;
		};
	},
});
