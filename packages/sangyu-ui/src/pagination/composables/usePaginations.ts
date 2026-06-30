import { computed, watch } from 'vue';
import type { PaginationEmits, PaginationProps } from '../Pagination.type';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { findAvailablePage, normalizePage } from '../helpers';
import { usePaginationModel } from './usePaginationModel';

export function usePagination(props: Readonly<PaginationProps>, emit: PaginationEmits) {
	const { currentPage, pageSize } = usePaginationModel(props, emit);

	const pageCount = computed(() => {
		if (typeof props.pageCount === 'number') return Math.max(0, Math.trunc(props.pageCount));
		if (typeof props.total === 'number') return Math.max(1, Math.ceil(props.total / Math.max(pageSize.value, 1)));
		return 0;
	});

	const isPagerDisabled = (page: number) => Boolean(props.disabled || props.disabledItems?.includes(page));
	const isPagerLoading = (page: number) => Boolean(props.loadingItems?.includes(page));

	// 设置当前页：
	// 这是分页内部所有页码跳转的统一入口。
	// 会依次处理：
	// 1. disabled 全局禁用
	// 2. 页码越界修正
	// 3. infinite 首尾循环
	// 4. disabledItems / loadingItems 跳过
	// 5. 真正有变化时才更新 currentPage
	const setCurrentPage = (page: number) => {
		if (props.disabled) return;
		const normalized = normalizePage(page, pageCount.value, props.infinite);
		const available = findAvailablePage(normalized, pageCount.value, {
			currentPage: currentPage.value,
			disabledItems: props.disabledItems,
			loadingItems: props.loadingItems,
			infinite: props.infinite,
		});
		if (available !== currentPage.value) currentPage.value = available;
	};
	// 跳到上一页。
	// 具体边界、循环、禁用页跳过逻辑仍交给 setCurrentPage 统一处理。
	const prev = () => {
		setCurrentPage(currentPage.value - 1);
		emit('prevClick', currentPage.value);
	};
	// 跳到下一页。
	// 具体边界、循环、禁用页跳过逻辑仍交给 setCurrentPage 统一处理。
	const next = () => {
		setCurrentPage(currentPage.value + 1);
		emit('nextClick', currentPage.value);
	};
	// 设置每页条数：
	// 1. 非法 pageSize 会回退到默认值。
	// 2. 更新 pageSize 后，如果当前页超过新的总页数，则自动回退。
	const setPageSize = (size: number) => {
		const nextSize = Number.isFinite(size) && size > 0 ? Math.trunc(size) : DEFAULT_PAGE_SIZE;
		pageSize.value = nextSize;
		if (currentPage.value > pageCount.value) setCurrentPage(pageCount.value);
	};

	watch(pageCount, (count) => {
		if (count > 0 && currentPage.value > count) setCurrentPage(count);
	});

	return {
		currentPage,
		pageSize,
		pageCount,
		isPagerDisabled,
		isPagerLoading,
		setCurrentPage,
		setPageSize,
		prev,
		next,
	};
}
