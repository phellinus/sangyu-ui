import { defineComponent } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'SyTableEmpty',
	props: {
		text: {
			type: String,
			default: '暂无数据',
		},
	},
	setup(props, { slots }) {
		const { c } = useClassnames('table');

		return () => (
			<div class={c('empty')} role='status'>
				{slots.default?.() ?? props.text}
			</div>
		);
	},
});
