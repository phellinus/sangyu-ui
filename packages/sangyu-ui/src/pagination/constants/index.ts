import type { PaginationLayoutItem } from '../Pagination.type';

export const DEFAULT_CURRENT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGER_COUNT = 7;
export const DEFAULT_PAGE_SIZES = [10, 20, 30, 40, 50, 100];

export const DEFAULT_LAYOUT: PaginationLayoutItem[] = [
	'prev',
	'pager',
	'next',
	'jumper',
	'->',
	'total',
	'slot',
	'sizes',
];
