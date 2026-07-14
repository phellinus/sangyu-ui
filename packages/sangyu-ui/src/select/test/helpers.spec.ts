import { ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { useVirtualList } from '../composables/useVirtualList';
import { toNumber } from '../helpers';

describe('select helpers', () => {
	it('converts string and number sizes and falls back for invalid values', () => {
		expect(toNumber(32, 10)).toBe(32);
		expect(toNumber('48px', 10)).toBe(48);
		expect(toNumber('invalid', 10)).toBe(10);
		expect(toNumber(undefined, 10)).toBe(10);
	});

	it('calculates the visible virtual-list range from the scroll position', () => {
		const list = ref(Array.from({ length: 100 }, (_, index) => index));
		const virtual = useVirtualList(list, ref(32), ref(96), ref(1));

		expect(virtual.visibleItems.value.map(({ index }) => index)).toEqual([0, 1, 2, 3, 4]);
		expect(virtual.totalHeight.value).toBe(3200);
		expect(virtual.offsetTop.value).toBe(0);

		virtual.handleScroll({ target: { scrollTop: 160 } } as unknown as Event);

		expect(virtual.scrollTop.value).toBe(160);
		expect(virtual.visibleItems.value.map(({ index }) => index)).toEqual([4, 5, 6, 7, 8]);
		expect(virtual.offsetTop.value).toBe(128);
	});

	it('keeps the virtual-list range inside short lists', () => {
		const list = ref(['A', 'B']);
		const virtual = useVirtualList(list, ref(32), ref(256), ref(6));

		expect(virtual.visibleItems.value).toEqual([
			{ item: 'A', index: 0 },
			{ item: 'B', index: 1 },
		]);
		expect(virtual.totalHeight.value).toBe(64);
	});
});
