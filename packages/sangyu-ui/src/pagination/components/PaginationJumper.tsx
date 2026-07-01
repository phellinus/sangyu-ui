import { defineComponent, PropType, ref, watch } from 'vue';

/**
 * @description 跳转
 */
export default defineComponent({
	name: 'PaginationJumper',
	props: {
		currentPage: { type: Number, required: true },
		disabled: Boolean,
		onChange: { type: Function as PropType<(page: number) => void>, required: true },
	},
	setup(props) {
		const value = ref(String(props.currentPage));

		watch(
			() => props.currentPage,
			(page) => (value.value = String(page)),
		);

		const commit = () => {
			const page = Number(value.value);
			if (!props.disabled && Number.isFinite(page)) props.onChange(Math.trunc(page));
		};

		return () => (
			<span class='sy-pagination-jumper'>
				<span>前往</span>
				<input
					class='sy-pagination-jumper-input'
					value={value.value}
					disabled={props.disabled}
					onInput={(event) => (value.value = (event.target as HTMLInputElement).value)}
					onBlur={commit}
					onKeydown={(event) => {
						if (event.key === 'Enter') commit();
					}}
				/>
				<span>页</span>
			</span>
		);
	},
});
