import { defineComponent, PropType } from 'vue';
import type { Component } from 'vue';

/**
 * @description 下一页
 */
export default defineComponent({
	name: 'PaginationNext',
	props: {
		disabled: Boolean,
		text: String,
		icon: [String, Object, Function] as PropType<string | Component>,
		onClick: Function as PropType<() => void>,
	},
	setup(props) {
		return () => (
			<button
				class='sy-pagination-next'
				type='button'
				disabled={props.disabled}
				aria-disabled={props.disabled}
				onClick={props.onClick}
			>
				{props.text || '>'}
			</button>
		);
	},
});
