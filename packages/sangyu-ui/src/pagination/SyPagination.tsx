import { computed, CSSProperties, defineComponent, PropType } from 'vue';
import { PaginationLayoutItem, PaginationProps, PaginationShape, PaginationSize } from './Pagination.type';
import { DEFAULT_LAYOUT, DEFAULT_PAGE_SIZES } from './constants';
import {
	PaginationJumper,
	PaginationNext,
	PaginationPager,
	PaginationPrev,
	PaginationProgress,
	PaginationSizes,
	PaginationTotal,
} from './components';
import { useClassnames } from '@sangyu-ui/utils';
import { usePagination } from './composables';

export default defineComponent({
	name: 'SyPagination',
	props: {
		currentPage: Number,
		defaultCurrentPage: Number,
		pageSize: Number,
		defaultPageSize: Number,
		total: Number,
		pageCount: Number,
		pagerCount: { type: Number, default: 7 },
		pageSizes: { type: Array as PropType<number[]>, default: () => DEFAULT_PAGE_SIZES },
		layout: { type: [String, Array] as PropType<string | PaginationLayoutItem[]>, default: () => DEFAULT_LAYOUT },
		disabled: Boolean,
		hideOnSinglePage: Boolean,
		prevText: String,
		nextText: String,
		color: String,
		shape: { type: String as PropType<PaginationShape>, default: 'default' },
		notMargin: Boolean,
		buttonsDotted: Boolean,
		progress: Boolean,
		infinite: Boolean,
		disabledItems: { type: Array as PropType<number[]>, default: () => [] },
		loadingItems: { type: Array as PropType<number[]>, default: () => [] },
		size: { type: String as PropType<PaginationSize>, default: 'default' },
		customStyle: { type: [String, Object] as PropType<string | CSSProperties> },
		onPageChange: Function as PropType<PaginationProps['onPageChange']>,
		onSizeChange: Function as PropType<PaginationProps['onSizeChange']>,
	},
	emits: ['update:currentPage', 'update:pageSize', 'pageChange', 'sizeChange', 'prevClick', 'nextClick'],
	setup(props, { emit, slots }) {
		const { c } = useClassnames('pagination');
		const state = usePagination(props, emit as any);

		const layoutItems = computed(
			() =>
				(Array.isArray(props.layout) ? props.layout : props.layout.split(',')).map((item) =>
					item.trim(),
				) as PaginationLayoutItem[],
		);

		const classes = computed(() => ({
			[c()]: true,
			[c(props.size)]: true,
			[c(props.shape)]: props.shape !== 'default',
			[c('not-margin')]: props.notMargin,
			[c('buttons-dotted')]: props.buttonsDotted,
			[c('disabled')]: props.disabled,
		}));

		const styles = computed(() => [
			props.customStyle,
			props.color ? ({ '--sy-pagination-active-color': props.color } as CSSProperties) : undefined,
		]);

		const renderItem = (item: PaginationLayoutItem) => {
			const prevDisabled = props.disabled || (!props.infinite && state.currentPage.value <= 1);
			const nextDisabled =
				props.disabled || (!props.infinite && state.currentPage.value >= state.pageCount.value);

			const map = {
				prev: () => <PaginationPrev disabled={prevDisabled} text={props.prevText} onClick={state.prev} />,
				pager: () => (
					<div class='sy-pagination-pager-wrap'>
						<PaginationPager
							currentPage={state.currentPage.value}
							pageCount={state.pageCount.value}
							pagerCount={props.pagerCount}
							disabled={props.disabled}
							buttonsDotted={props.buttonsDotted}
							progress={props.progress}
							isPagerDisabled={state.isPagerDisabled}
							isPagerLoading={state.isPagerLoading}
							onChange={state.setCurrentPage}
						/>
						{props.progress && (
							<PaginationProgress
								currentPage={state.currentPage.value}
								pageCount={state.pageCount.value}
							/>
						)}
					</div>
				),
				next: () => <PaginationNext disabled={nextDisabled} text={props.nextText} onClick={state.next} />,
				jumper: () => (
					<PaginationJumper
						currentPage={state.currentPage.value}
						disabled={props.disabled}
						onChange={state.setCurrentPage}
					/>
				),
				total: () => <PaginationTotal total={props.total ?? 0} disabled={props.disabled} />,
				sizes: () => (
					<PaginationSizes
						pageSize={state.pageSize.value}
						pageSizes={props.pageSizes}
						disabled={props.disabled}
						onChange={state.setPageSize}
					/>
				),
				slot: () =>
					slots.default?.({
						currentPage: state.currentPage.value,
						pageSize: state.pageSize.value,
						pageCount: state.pageCount.value,
						total: props.total,
						pageSizes: props.pageSizes,
						pagerCount: props.pagerCount,
					}),
				'->': () => null,
			};

			return map[item]?.();
		};

		return () => {
			if (props.hideOnSinglePage && state.pageCount.value <= 1) return null;

			const left: any[] = [];
			const right: any[] = [];
			let useRight = false;

			layoutItems.value.forEach((item) => {
				if (item === '->') {
					useRight = true;
					return;
				}
				const node = renderItem(item);
				if (node) (useRight ? right : left).push(node);
			});

			return (
				<nav class={classes.value} style={styles.value} role='navigation' aria-label='pagination'>
					{left}
					{right.length > 0 && <div class={c('right')}>{right}</div>}
				</nav>
			);
		};
	},
});
