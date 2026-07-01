import { computed, defineComponent } from 'vue';

/**
 * @description 进度条
 */
export default defineComponent({
	name: 'PaginationProgress',
	props: {
		currentPage: { type: Number, required: true },
		pageCount: { type: Number, required: true },
	},
	setup(props) {
		const width = computed(() => {
			if (!props.pageCount) return '0%';
			return `${Math.min(100, (props.currentPage / props.pageCount) * 100)}%`;
		});

		return () => (
			<div class='sy-pagination-progress'>
				<div class='sy-pagination-progress-bar' style={{ width: width.value }} />
			</div>
		);
	},
});
