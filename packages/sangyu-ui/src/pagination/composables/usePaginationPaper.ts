import { computed } from 'vue';
import { getPagerList } from '../helpers';
import { DEFAULT_PAGER_COUNT } from '../constants';

/**
 * 当前页数
 * @param currentPage
 * @param pageCount
 * @param pagerCount
 * @returns
 */
export function usePaginationPager(currentPage: () => number, pageCount: () => number, pagerCount?: () => number) {
	// 规范化 pagerCount：
	// pagerCount 表示最多展示多少个页码按钮。
	// 为了让当前页能稳定居中，通常要求它是一个大于 4、小于 22 的奇数。
	// 如果传入非法值，则回退到 DEFAULT_PAGER_COUNT。
	const normalizedPagerCount = computed(() => {
		const count = pagerCount?.() ?? DEFAULT_PAGER_COUNT;
		return count > 4 && count < 22 && count % 2 === 1 ? count : DEFAULT_PAGER_COUNT;
	});
	// 根据当前页、总页数、最多展示页码数，计算页码折叠结果。
	// 返回内容包括：
	// 1. 中间页码列表 pagers
	// 2. 是否显示前省略号 showPrevMore
	// 3. 是否显示后省略号 showNextMore
	const pagerResult = computed(() => getPagerList(currentPage(), pageCount(), normalizedPagerCount.value));

	return {
		pagerCountValue: normalizedPagerCount,
		pagers: computed(() => pagerResult.value.pagers),
		showPrevMore: computed(() => pagerResult.value.showPrevMore),
		showNextMore: computed(() => pagerResult.value.showNextMore),
	};
}
