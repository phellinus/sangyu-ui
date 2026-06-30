import { defineComponent, PropType } from 'vue';
import type { Component } from 'vue';

/**
 * @description 上一页
 */
export default defineComponent({
	name: 'PaginationPrev',
	props: {
		disabled: Boolean,
		text: String,
		icon: [String, Object, Function] as PropType<string | Component>,
		onClick: Function as PropType<() => void>,
	},
	setup(props) {
		return () => (
			<button
				class='sy-pagination-prev'
				type='button'
				disabled={props.disabled}
				aria-disabled={props.disabled}
				onClick={props.onClick}
			>
				{props.text || '<'}
			</button>
		);
	},
});
