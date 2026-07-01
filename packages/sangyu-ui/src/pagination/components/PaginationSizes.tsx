import { defineComponent, PropType } from 'vue';

/**
 * @description 每页条数
 */
export default defineComponent({
	name: 'PaginationSizes',
	props: {
		pageSize: { type: Number, required: true },
		pageSizes: { type: Array as PropType<number[]>, required: true },
		disabled: Boolean,
		onChange: { type: Function as PropType<(size: number) => void>, required: true },
	},
	setup(props) {
		return () => (
			<select
				class='sy-pagination-sizes'
				value={props.pageSize}
				disabled={props.disabled}
				onChange={(event) => props.onChange(Number((event.target as HTMLSelectElement).value))}
			>
				{props.pageSizes.map((size) => (
					<option value={size}>{size} 条/页</option>
				))}
			</select>
		);
	},
});
