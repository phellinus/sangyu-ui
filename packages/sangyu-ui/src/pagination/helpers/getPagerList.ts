export interface PagerListResult {
	pagers: number[];
	showPrevMore: boolean;
	showNextMore: boolean;
}

//负责跳过禁用/加载页
export function getPagerList(currentPage: number, pageCount: number, pagerCount: number): PagerListResult {
	const halfPagerCount = (pagerCount - 1) / 2;
	let showPrevMore = false;
	let showNextMore = false;

	if (pageCount > pagerCount) {
		showPrevMore = currentPage > pagerCount - halfPagerCount;
		showNextMore = currentPage < pageCount - halfPagerCount;
	}

	const pagers: number[] = [];

	if (showPrevMore && !showNextMore) {
		const startPage = pageCount - (pagerCount - 2);
		for (let i = startPage; i < pageCount; i += 1) pagers.push(i);
	} else if (!showPrevMore && showNextMore) {
		for (let i = 2; i < pagerCount; i += 1) pagers.push(i);
	} else if (showPrevMore && showNextMore) {
		const offset = Math.floor(pagerCount / 2) - 1;
		for (let i = currentPage - offset; i <= currentPage + offset; i += 1) pagers.push(i);
	} else {
		for (let i = 2; i < pageCount; i += 1) pagers.push(i);
	}

	return { pagers, showPrevMore, showNextMore };
}
