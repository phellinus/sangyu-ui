import { normalizePage } from './normalizePage';

// 负责跳过禁用/加载页
export function findAvailablePage(
	target: number,
	pageCount: number,
	options: {
		currentPage: number;
		disabledItems?: number[];
		loadingItems?: number[];
		infinite?: boolean;
	},
) {
	const disabled = new Set(options.disabledItems ?? []);
	const loading = new Set(options.loadingItems ?? []);
	const blocked = (page: number) => disabled.has(page) || loading.has(page);

	let page = normalizePage(target, pageCount, options.infinite);
	if (!blocked(page)) return page;

	const direction = target >= options.currentPage ? 1 : -1;

	for (let step = 1; step <= pageCount; step += 1) {
		const next = normalizePage(page + direction * step, pageCount, options.infinite);
		if (!next || next === options.currentPage) continue;
		if (!blocked(next)) return next;
	}

	return options.currentPage;
}
