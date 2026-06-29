import { computed, ref } from 'vue';
import { PaginationEmits, PaginationProps } from '../Pagination.type';
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '../constants';

export function usePaginationModel(props: Readonly<PaginationProps>, emit: PaginationEmits) {
	// 内部当前页状态：
	const innerCurrentPage = ref(props.defaultCurrentPage ?? DEFAULT_CURRENT_PAGE);
	//内部每条页数的状态
	const innerPageSize = ref(props.defaultPageSize ?? DEFAULT_PAGE_SIZE);
	// 当前页桥接值：
	const currentPage = computed({
		get: () => props.currentPage ?? innerCurrentPage.value,
		set: (value: number) => {
			if (props.currentPage === undefined) innerCurrentPage.value = value;
			emit('update:currentPage', value);
			emit('pageChange', value);
			props.onPageChange?.(value);
		},
	});
	const pageSize = computed({
		get: () => props.pageSize ?? innerPageSize.value,

		set: (value: number) => {
			if (props.pageSize === undefined) innerPageSize.value = value;
			emit('update:pageSize', value);
			emit('sizeChange', value);
			props.onSizeChange?.(value);
		},
	});
	return { currentPage, pageSize };
}
