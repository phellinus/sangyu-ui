import { defineComponent } from 'vue';
/**
 * @description 总条数
 */
export default defineComponent({
	name: 'PaginationTotal',
	props: {
		total: { type: Number, default: 0 },
		disabled: Boolean,
	},
	setup(props) {
		return () => (
			<span class={{ 'sy-pagination-total': true, 'sy-pagination-total-disabled': props.disabled }}>
				共 {props.total} 条
			</span>
		);
	},
});
