import { describe, expect, it } from 'vitest';
import { findAvailablePage, getPagerList, normalizePage } from '../helpers';

describe('pagination helpers', () => {
	it('normalizes page values within valid range', () => {
		expect(normalizePage(Number.NaN, 10)).toBe(1);
		expect(normalizePage(0, 10)).toBe(1);
		expect(normalizePage(11, 10)).toBe(10);
		expect(normalizePage(3.8, 10)).toBe(3);
		expect(normalizePage(1, 0)).toBe(0);
	});

	it('supports infinite page normalization', () => {
		expect(normalizePage(0, 10, true)).toBe(10);
		expect(normalizePage(11, 10, true)).toBe(1);
	});

	it('finds the next available page when target is disabled or loading', () => {
		expect(
			findAvailablePage(2, 8, {
				currentPage: 1,
				disabledItems: [2],
				loadingItems: [3],
			}),
		).toBe(4);

		expect(
			findAvailablePage(4, 8, {
				currentPage: 5,
				disabledItems: [4],
				loadingItems: [3],
			}),
		).toBe(2);
	});

	it('keeps current page when no available target can be found', () => {
		expect(
			findAvailablePage(2, 3, {
				currentPage: 1,
				disabledItems: [2, 3],
			}),
		).toBe(1);
	});

	it('computes collapsed pager list around start, middle and end', () => {
		expect(getPagerList(1, 20, 7)).toEqual({
			pagers: [2, 3, 4, 5, 6],
			showPrevMore: false,
			showNextMore: true,
		});

		expect(getPagerList(10, 20, 7)).toEqual({
			pagers: [8, 9, 10, 11, 12],
			showPrevMore: true,
			showNextMore: true,
		});

		expect(getPagerList(19, 20, 7)).toEqual({
			pagers: [15, 16, 17, 18, 19],
			showPrevMore: true,
			showNextMore: false,
		});
	});
});
