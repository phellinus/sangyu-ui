import { computed, defineComponent, nextTick, PropType, ref, watch } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import { usePaginationPager } from '../composables';
/**
 * @description 分页
 */
export default defineComponent({
	name: 'PaginationPager',
	props: {
		currentPage: { type: Number, required: true },
		pageCount: { type: Number, required: true },
		pagerCount: { type: Number, default: 7 },
		disabled: Boolean,
		buttonsDotted: Boolean,
		progress: Boolean,
		isPagerDisabled: { type: Function as PropType<(page: number) => boolean>, required: true },
		isPagerLoading: { type: Function as PropType<(page: number) => boolean>, required: true },
		onChange: { type: Function as PropType<(page: number) => void>, required: true },
	},
	setup(props) {
		const { c } = useClassnames('pager');
		const pagerRef = ref<HTMLElement>();
		const activeLeft = ref(0);
		const changing = ref(false);

		const pager = usePaginationPager(
			() => props.currentPage,
			() => props.pageCount,
			() => props.pagerCount,
		);

		const activeStyle = computed(() => ({ left: `${activeLeft.value}px` }));

		const updateActivePosition = async () => {
			await nextTick();
			const active = pagerRef.value?.querySelector<HTMLElement>(`[data-page="${props.currentPage}"]`);
			if (!active) return;
			activeLeft.value = active.offsetLeft;
			changing.value = true;
			window.setTimeout(() => (changing.value = false), 300);
		};

		watch(() => [props.currentPage, props.pageCount, props.pagerCount], updateActivePosition, {
			immediate: true,
			flush: 'post',
		});

		const clickPage = (page: number) => {
			if (props.disabled || props.isPagerDisabled(page) || props.isPagerLoading(page)) return;
			props.onChange(page);
		};

		const clickMore = (type: 'prev' | 'next') => {
			const offset = props.pagerCount - 2;
			props.onChange(type === 'prev' ? props.currentPage - offset : props.currentPage + offset);
		};

		const renderButton = (page: number) => (
			<button
				type='button'
				class={{
					[c('button')]: true,
					[c('active')]: props.currentPage === page,
					[c('disabled')]: props.isPagerDisabled(page),
					[c('loading')]: props.isPagerLoading(page),
				}}
				data-page={page}
				aria-label={`${page}`}
				aria-current={props.currentPage === page ? 'page' : undefined}
				tabindex={props.isPagerDisabled(page) || props.isPagerLoading(page) ? -1 : 0}
				onClick={() => clickPage(page)}
				onKeydown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') clickPage(page);
				}}
			>
				{props.buttonsDotted ? '' : page}
				{props.isPagerLoading(page) && <span class={c('spinner')} />}
			</button>
		);

		return () => (
			<div ref={pagerRef} class={c()}>
				{props.pageCount > 0 && renderButton(1)}

				{pager.showPrevMore.value && !props.buttonsDotted && (
					<button class={[c('more'), c('quick-prev')]} type='button' onClick={() => clickMore('prev')}>
						<span class={c('ellipsis')}>...</span>
						<span class={c('more-icon')}>{'<<'}</span>
					</button>
				)}

				{pager.pagers.value.map(renderButton)}

				{pager.showNextMore.value && !props.buttonsDotted && (
					<button class={[c('more'), c('quick-next')]} type='button' onClick={() => clickMore('next')}>
						<span class={c('ellipsis')}>...</span>
						<span class={c('more-icon')}>{'>>'}</span>
					</button>
				)}

				{props.pageCount > 1 && renderButton(props.pageCount)}

				{props.pageCount > 0 && (
					<div class={{ [c('aria-active')]: true, [c('change')]: changing.value }} style={activeStyle.value}>
						{props.buttonsDotted ? '' : props.currentPage}
					</div>
				)}
			</div>
		);
	},
});
