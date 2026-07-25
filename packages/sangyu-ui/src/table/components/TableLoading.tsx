import { defineComponent } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'SyTableLoading',
	setup(_, { slots }) {
		const { c } = useClassnames('table');

		return () => (
			<div class={c('loading-mask')} role='status' aria-live='polite'>
				{slots.default?.() ?? (
					<div class={c('loading-content')}>
						<span class={c('loading-spinner')} aria-hidden='true' />
						<span>加载中</span>
					</div>
				)}
			</div>
		);
	},
});
