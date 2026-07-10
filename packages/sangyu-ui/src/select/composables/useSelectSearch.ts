import { computed, ref, watch } from 'vue';
import { SelectOption, SySelectEmits, SySelectProps } from '../Select.type';

export function useSelectSearch(props: SySelectProps, emit: SySelectEmits) {
	/**当前搜索关键字 */
	const query = ref('');
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

	/** 搜索词变化时，如果传入 remoteMethod，则触发远程搜索 */
	watch(query, (value) => {
		if (props.remoteMethod) props.remoteMethod(value);
	});

	return {
		query,
		setQuery,
		filteredOptions,
	};
}
