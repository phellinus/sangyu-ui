import { computed, ref, watch } from 'vue';
import { SelectOption, SySelectEmits, SySelectProps } from '../Select.type';

export function useSelectSearch(props: SySelectProps, emit: SySelectEmits) {
	/**当前搜索关键字 */
	const query = ref('');
	/** 远程搜索是否加载中 */
	const searching = ref(false);
	/** 当前请求序号，用于避免旧请求覆盖新请求状态 */
	let searchRequestId = 0;
	/**
	 * 设置搜索关键词，并向外派发 search 事件。
	 * @param value 用户输入的搜索内容
	 */
	const setQuery = (value: string) => {
		query.value = value;
		emit('search', value);
	};
	/**
	 * 过滤后的选项列表。
	 * 远程搜索模式下不做本地过滤，只展示外部传入的新 options。
	 */
	const filteredOptions = computed<SelectOption[]>(() => {
		if (!props.filterable || !query.value) return props.options;
		if (props.remoteMethod) return props.options;
		if (props.filterMethod) return props.options.filter((option) => props.filterMethod?.(query.value, option));
		return props.options.filter((option) => option.label.toLowerCase().includes(query.value.toLowerCase()));
	});

	/**
	 * 执行远程搜索。
	 * 支持 Promise，并通过 requestId 避免过期请求错误地关闭 loading。
	 * @param value 当前搜索关键词
	 */
	const runRemoteSearch = async (value: string) => {
		if (!props.remoteMethod) return;

		const requestId = ++searchRequestId;
		searching.value = true;

		try {
			await props.remoteMethod(value);
		} finally {
			if (requestId === searchRequestId) {
				searching.value = false;
			}
		}
	};

	/** 搜索词变化时触发远程异步搜索 */
	watch(query, (value) => {
		if (props.remoteMethod) {
			runRemoteSearch(value);
		}
	});

	return {
		query,
		searching,
		setQuery,
		filteredOptions,
		runRemoteSearch,
	};
}
