import { computed, onScopeDispose, ref, watch } from 'vue';
import { SelectOption, SelectValue, SySelectEmits, SySelectProps } from '../Select.type';

export function useSelectSearch(props: SySelectProps, emit: SySelectEmits) {
	/**当前搜索关键字 */
	const query = ref('');
	/** 远程搜索是否加载中 */
	const searching = ref(false);
	/** 防抖定时器 */
	let debounceTimer: ReturnType<typeof setTimeout> | undefined;

	/** 当前请求对应的 AbortController */
	let activeController: AbortController | undefined;

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
	 * 标签模式下可以展示的完整选项。
	 *
	 * 原始 options 保持在前面；
	 * 通过输入创建的标签追加到下拉列表底部。
	 */
	const labelOptions = computed<SelectOption[]>(() => {
		if (props.mode !== 'label') {
			return props.options;
		}
		const sourceValues = new Set<SelectValue>(props.options.map((option) => option.value));
		const modelValues: SelectValue[] = Array.isArray(props.modelValue)
			? props.modelValue
			: props.modelValue === undefined
				? []
				: [props.modelValue];

		const createdOptions = modelValues
			.filter((value) => !sourceValues.has(value))
			.map<SelectOption>((value) => ({
				label: String(value),
				value,
			}));
		return [...props.options, ...createdOptions];
	});
	/**
	 * 根据当前输入内容创建临时候选标签。
	 *
	 * 候选标签只用于下拉面板展示；
	 * 用户点击候选项或按下 Enter 后才会写入 v-model。
	 *
	 * @param value 当前输入内容
	 * @param currentOptions 当前已有选项
	 */
	const createLabelCandidate = (value: string, currentOptions: SelectOption[]): SelectOption | undefined => {
		const label = value.trim();

		if (!label) return undefined;

		const normalizedLabel = label.toLowerCase();

		const exists = currentOptions.some((option) => {
			return option.value === label || option.label.trim().toLowerCase() === normalizedLabel;
		});

		if (exists) return undefined;

		return {
			label,
			value: label,
			/** 标记当前选项为尚未创建的候选标签 */
			__labelCandidate: true,
		};
	};
	/**
	 * 过滤后的选项列表。
	 * 远程搜索模式下不做本地过滤，只展示外部传入的新 options。
	 */
	const filteredOptions = computed<SelectOption[]>(() => {
		const searchable = props.filterable || props.mode === 'label';

		const currentOptions = labelOptions.value;
		const keyword = query.value.trim();

		if (!searchable || !keyword) {
			return currentOptions;
		}

		let result: SelectOption[];

		if (props.remoteMethod) {
			// 远程搜索模式下由外部更新 options
			result = currentOptions;
		} else if (props.filterMethod) {
			result = currentOptions.filter((option) => props.filterMethod?.(keyword, option));
		} else {
			const normalizedKeyword = keyword.toLowerCase();

			result = currentOptions.filter((option) => option.label.toLowerCase().includes(normalizedKeyword));
		}

		if (props.mode !== 'label') {
			return result;
		}

		const candidate = createLabelCandidate(keyword, currentOptions);

		// 候选标签放在搜索结果底部
		return candidate ? [...result, candidate] : result;
	});
	/**
	 * 判断异常是否由 AbortController 取消请求产生。
	 * @param error 请求抛出的异常
	 */
	const isAbortError = (error: unknown): boolean => {
		return error instanceof DOMException && error.name === 'AbortError';
	};
	/**
	 * 执行远程搜索。
	 * 支持 Promise，并通过 requestId 避免过期请求错误地关闭 loading。
	 * @param value 当前搜索关键词
	 */
	const runRemoteSearch = async (value: string, requestId: number): Promise<void> => {
		if (!props.remoteMethod) return;

		const controller = new AbortController();
		activeController = controller;
		searching.value = true;

		try {
			await props.remoteMethod(value, controller.signal);
		} catch (error) {
			if (!isAbortError(error)) {
				console.error('[SySelect] 远程搜索失败：', error);
			}
		} finally {
			// 只有最后一次请求才能修改 loading 状态
			if (requestId === searchRequestId) {
				searching.value = false;

				if (activeController === controller) {
					activeController = undefined;
				}
			}
		}
	};
	/**
	 * 使用防抖调度远程搜索。
	 * 输入发生变化时会清除定时器并取消上一次请求。
	 * @param value 当前搜索关键词
	 */
	const scheduleRemoteSearch = (value: string) => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
			debounceTimer = undefined;
		}

		// 输入变化后立即取消旧请求，避免旧数据覆盖新数据
		activeController?.abort();
		activeController = undefined;

		const requestId = ++searchRequestId;

		if (!props.remoteMethod) {
			searching.value = false;
			return;
		}

		const delay = Math.max(0, props.remoteDebounce ?? 300);

		debounceTimer = setTimeout(() => {
			debounceTimer = undefined;
			void runRemoteSearch(value, requestId);
		}, delay);
	};
	/** 搜索词变化时触发远程异步搜索 */
	watch(query, scheduleRemoteSearch);
	/** 组件销毁时清理定时器和未完成的请求 */
	onScopeDispose(() => {
		searchRequestId += 1;

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		activeController?.abort();
	});
	return {
		query,
		searching,
		labelOptions,
		setQuery,
		filteredOptions,
		runRemoteSearch,
	};
}
