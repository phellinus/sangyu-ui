//找到一个可以真正跳转的页码
export function normalizePage(page: number, pageCount: number, infinite = false) {
	if (!Number.isFinite(page)) return 1;
	if (pageCount <= 0) return 0;

	if (page < 1) return infinite ? pageCount : 1;
	if (page > pageCount) return infinite ? 1 : pageCount;

	return Math.trunc(page);
}
