import { computed, defineComponent, PropType } from 'vue';
import SySelect from '../../select';
import type { SelectModelValue } from '../../select/Select.type';
import type { PaginationSize } from '../Pagination.type';

/**
 * @description 每页条数
 */
export default defineComponent({
	name: 'PaginationSizes',
	props: {
		pageSize: { type: Number, required: true },
		pageSizes: { type: Array as PropType<number[]>, required: true },
		disabled: Boolean,
		size: { type: String as PropType<PaginationSize>, default: 'default' },
		onChange: { type: Function as PropType<(size: number) => void>, required: true },
	},
	setup(props) {
		const options = computed(() =>
			props.pageSizes.map((size) => ({
				label: `${size} 条/页`,
				value: size,
			})),
		);

		const handleChange = (value: SelectModelValue) => {
			if (typeof value === 'number') props.onChange(value);
		};

		return () => (
			<span class='sy-pagination-sizes'>
				<SySelect
					modelValue={props.pageSize}
					options={options.value}
					disabled={props.disabled}
					size={props.size}
					width='112px'
					virtual={false}
					placeholder='每页条数'
					onChange={handleChange}
				/>
			</span>
		);
	},
});
