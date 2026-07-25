import { defineComponent, type PropType } from 'vue';
import type { TableAlign, TableColumn, TableDataIndex, TableFixed } from '../Table.type';

const SyTableColumn = defineComponent({
	name: 'SyTableColumn',
	props: {
		title: {
			type: [String, Number, Object, Function] as PropType<TableColumn['title']>,
		},
		dataIndex: {
			type: [String, Number, Array] as PropType<TableDataIndex>,
		},
		width: {
			type: [Number, String],
		},
		minWidth: {
			type: [Number, String],
		},
		align: {
			type: String as PropType<TableAlign>,
			default: 'left',
		},
		fixed: {
			type: [Boolean, String] as PropType<TableFixed>,
		},
		ellipsis: Boolean,
		headerClassName: String,
		className: String,
		customRender: Function as PropType<TableColumn['customRender']>,
	},
	setup() {
		// 该组件仅用于声明列，实际内容由 SyTable 收集并渲染
		return () => null;
	},
});

export default SyTableColumn;
