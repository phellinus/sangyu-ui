import { defineComponent, type PropType } from 'vue';
import type { InternalTableColumn } from '../Table.type';

function addUnit(value?: number | string) {
	if (value === undefined) return undefined;
	return typeof value === 'number' ? `${value}px` : value;
}

export default defineComponent({
	name: 'SyTableColGroup',
	props: {
		columns: {
			type: Array as PropType<InternalTableColumn[]>,
			default: () => [],
		},
	},
	setup(props) {
		return () => (
			<colgroup>
				{props.columns.map((column) => (
					<col
						key={column.__key}
						style={{
							width: addUnit(column.width),
							minWidth: addUnit(column.minWidth),
						}}
					/>
				))}
			</colgroup>
		);
	},
});
