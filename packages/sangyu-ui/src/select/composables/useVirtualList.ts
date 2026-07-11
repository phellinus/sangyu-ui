import { computed, ref, Ref } from 'vue';

/**
 * 管理虚拟滚动列表。
 * 只渲染可视区域附近的数据。
 */
export function useVirtualList<T>(
	list: Ref<T[]>,
	itemHeight: Ref<number>,
	listHeight: Ref<number>,
	overscan: Ref<number>,
) {
	/** 当前滚动的距离 */
	const scrollTop = ref(0);

	/** 可视区域能展示的选项数量 */
	const visibleCount = computed(() => Math.ceil(listHeight.value / itemHeight.value));

	/** 当前需要渲染的起始索引，额外向上预渲染 overscan 项 */
	const start = computed(() => Math.max(0, Math.floor(scrollTop.value / itemHeight.value) - overscan.value));

	/** 当前需要渲染的结束索引，额外向下预渲染 overscan 项 */
	const end = computed(() => Math.min(list.value.length, start.value + visibleCount.value + overscan.value * 2));

	/** 实际渲染的列表项，保留原始索引用于键盘高亮和选中判断 */
	const visibleItems = computed(() =>
		list.value.slice(start.value, end.value).map((item, index) => ({
			item,
			index: start.value + index,
		})),
	);

	/** 完整列表总高度，用于撑开滚动区域 */
	const totalHeight = computed(() => list.value.length * itemHeight.value);

	/** 当前渲染片段相对顶部的偏移量 */
	const offsetTop = computed(() => start.value * itemHeight.value);

	/**
	 * 处理滚动事件，更新 scrollTop。
	 * @param event 下拉列表滚动事件
	 */
	const handleScroll = (event: Event) => {
		scrollTop.value = (event.target as HTMLElement).scrollTop;
	};

	return {
		scrollTop,
		visibleItems,
		totalHeight,
		offsetTop,
		handleScroll,
	};
}
