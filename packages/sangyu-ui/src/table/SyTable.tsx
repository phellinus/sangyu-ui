import { computed, defineComponent, watch, type CSSProperties, type PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { InternalTableColumn, TableColumn, TableProps, TableRowKey, TableScroll, TableSize } from './Table.type';
import { TableBody, TableHeader, TableLoading } from './components';
import { getColumnsPixelWidth, normalizeTableColumns, useTableScroll } from './composables';

type RuntimeTableColumn = InternalTableColumn<any>;
function addUnit(value?: number | string) {
	if (value === undefined) return undefined;
	return typeof value === 'number' ? `${value}px` : value;
}

function getTableStyle(columns: RuntimeTableColumn[], scroll?: TableScroll): CSSProperties {
	const columnsWidth = getColumnsPixelWidth(columns);

	if (scroll?.x === true) {
		return {
			width: 'max-content',
			minWidth: '100%',
		};
	}

	if (scroll?.x !== undefined) {
		return {
			width: addUnit(scroll.x),
			minWidth: '100%',
		};
	}

	return {
		width: '100%',
		minWidth: columnsWidth > 0 ? `${columnsWidth}px` : undefined,
	};
}

export default defineComponent({
	name: 'SyTable',
	props: {
		columns: {
			type: Array as PropType<TableColumn<any>[]>,
			default: () => [],
		},
		dataSource: {
			type: Array as PropType<any[]>,
		},
		data: {
			type: Array as PropType<any[]>,
		},
		rowKey: {
			type: [String, Function] as PropType<string | ((record: any, index: number) => TableRowKey)>,
			default: 'key',
		},
		scroll: {
			type: Object as PropType<TableScroll>,
			default: () => ({}),
		},
		loading: Boolean,
		emptyText: {
			type: String,
			default: '暂无数据',
		},
		bordered: Boolean,
		striped: Boolean,
		size: {
			type: String as PropType<TableSize>,
			default: 'middle',
		},
		rowClassName: {
			type: [String, Function] as PropType<TableProps<any>['rowClassName']>,
		},
		customStyle: {
			type: [String, Object] as PropType<TableProps<any>['customStyle']>,
		},
	},
	emits: ['rowClick'],
	setup(props, { slots, emit }) {
		const { c, cm } = useClassnames('table');
		const { headerViewportRef, bodyViewportRef, headerViewportStyle, handleBodyScroll, updateScrollbarWidth } =
			useTableScroll();

		const dataSource = computed(() => props.dataSource ?? props.data ?? []);

		// 数据数量变化后重新检测纵向滚动条宽度
		watch(() => [dataSource.value.length, props.scroll?.y], updateScrollbarWidth, { flush: 'post' });

		return () => {
			const columns = normalizeTableColumns(props.columns, slots);
			const tableStyle = getTableStyle(columns, props.scroll);
			const hasBodyScroll = props.scroll?.y !== undefined;

			return (
				<div
					class={[
						c('wrapper'),
						{
							[c(cm('bordered'))]: props.bordered,
							[c(cm('striped'))]: props.striped,
							[c(cm(`size-${props.size}`))]: true,
							[c(cm('scroll-y'))]: hasBodyScroll,
							[c(cm('empty'))]: dataSource.value.length === 0,
							[c(cm('loading'))]: props.loading,
						},
					]}
					style={props.customStyle}
					aria-busy={props.loading}
				>
					<div ref={headerViewportRef} class={c('header-viewport')} style={headerViewportStyle.value}>
						<TableHeader
							columns={columns}
							tableStyle={tableStyle}
							v-slots={{
								headerCell: slots.headerCell,
							}}
						/>
					</div>

					<div class={c('body-shell')}>
						<div
							ref={bodyViewportRef}
							class={c('body-viewport')}
							style={{
								maxHeight: addUnit(props.scroll?.y),
							}}
							onScroll={handleBodyScroll}
						>
							<TableBody
								columns={columns}
								dataSource={dataSource.value}
								rowKey={props.rowKey}
								rowClassName={props.rowClassName}
								emptyText={props.emptyText}
								tableStyle={tableStyle}
								onRowClick={(record, index, event) => emit('rowClick', record, index, event)}
								v-slots={{
									bodyCell: slots.bodyCell,
									empty: slots.empty,
								}}
							/>
						</div>

						{props.loading && <TableLoading v-slots={{ default: slots.loading }} />}
					</div>
				</div>
			);
		};
	},
});
