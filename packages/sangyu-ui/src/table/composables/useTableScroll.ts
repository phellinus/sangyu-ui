import { computed, nextTick, onBeforeUnmount, onMounted, ref, type CSSProperties } from 'vue';

/**
 * 表格横向滚动
 * @returns
 */
export function useTableScroll() {
	const headerViewportRef = ref<HTMLElement | null>(null);
	const bodyViewportRef = ref<HTMLElement | null>(null);
	const scrollbarWidth = ref(0);

	let resizeObserver: ResizeObserver | undefined;

	const updateScrollbarWidth = async () => {
		await nextTick();

		const body = bodyViewportRef.value;
		if (!body) return;

		// 给表头预留表体纵向滚动条宽度，避免列错位
		scrollbarWidth.value = Math.max(0, body.offsetWidth - body.clientWidth);
	};

	const handleBodyScroll = (event: Event) => {
		const body = event.currentTarget as HTMLElement;
		const header = headerViewportRef.value;

		// 表头本身不出现滚动条，只同步横向滚动位置
		if (header) header.scrollLeft = body.scrollLeft;
	};

	const headerViewportStyle = computed<CSSProperties>(() => ({
		paddingRight: scrollbarWidth.value > 0 ? `${scrollbarWidth.value}px` : undefined,
	}));

	onMounted(async () => {
		await updateScrollbarWidth();

		const body = bodyViewportRef.value;
		if (!body || typeof ResizeObserver === 'undefined') return;

		resizeObserver = new ResizeObserver(updateScrollbarWidth);
		resizeObserver.observe(body);

		const bodyTable = body.querySelector('table');
		if (bodyTable) resizeObserver.observe(bodyTable);
	});

	onBeforeUnmount(() => {
		resizeObserver?.disconnect();
	});

	return {
		headerViewportRef,
		bodyViewportRef,
		headerViewportStyle,
		handleBodyScroll,
		updateScrollbarWidth,
	};
}
