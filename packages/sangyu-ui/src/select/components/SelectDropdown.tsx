import { computed, defineComponent, PropType, toRef, Transition } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { SelectOption as OptionType } from '../Select.type';
import { useVirtualList } from '../composables';
import { toNumber } from '../helpers';
import SelectOption from './SelectOption';

export default defineComponent({
	name: 'SelectDropdown',
	props: {
		options: { type: Array as PropType<OptionType[]>, default: () => [] },
		visible: Boolean,
		loading: Boolean,
		emptyText: { type: String, default: '暂无数据' },
		itemHeight: { type: [String, Number], default: 32 },
		listHeight: { type: [String, Number], default: 256 },
		overscan: { type: Number, default: 6 },
		virtual: { type: Boolean, default: true },
		activeIndex: { type: Number, default: -1 },
		isSelected: { type: Function as PropType<(option: OptionType) => boolean>, required: true },
	},
	emits: ['select'],
	setup(props, { emit, slots }) {
		const { c } = useClassnames('select-dropdown');
		const listRef = toRef(props, 'options');
		const itemHeight = computed(() => toNumber(props.itemHeight, 32));
		const listHeight = computed(() => toNumber(props.listHeight, 256));
		const overscan = computed(() => props.overscan);
		const virtual = useVirtualList(listRef, itemHeight, listHeight, overscan);

		/**渲染加载中状态 */
		const renderLoading = () => slots.loading?.() ?? <div class={c('loading')}>加载中...</div>;

		/**渲染空状态 */
		const renderEmpty = () => slots.empty?.() ?? <div class={c('empty')}>{props.emptyText}</div>;
		/**
		 * 渲染普通选项列表。
		 */
		const renderOptions = () => {
			const items = props.virtual
				? virtual.visibleItems.value
				: props.options.map((item, index) => ({ item, index }));

			return (
				<div
					style={
						props.virtual ? { height: `${virtual.totalHeight.value}px`, position: 'relative' } : undefined
					}
				>
					<div style={props.virtual ? { transform: `translateY(${virtual.offsetTop.value}px)` } : undefined}>
						{items.map(({ item, index }) =>
							slots.option ? (
								<SelectOption
									key={String(item.value)}
									option={item}
									index={index}
									selected={props.isSelected(item)}
									active={props.activeIndex === index}
									onClick={(option: OptionType) => emit('select', option)}
								>
									{{ default: slots.option }}
								</SelectOption>
							) : (
								<SelectOption
									key={String(item.value)}
									option={item}
									index={index}
									selected={props.isSelected(item)}
									active={props.activeIndex === index}
									onClick={(option: OptionType) => emit('select', option)}
								/>
							),
						)}
					</div>
				</div>
			);
		};

		/**
		 * 渲染下拉面板内容。
		 */
		const renderPanel = () => {
			if (!props.visible) return null;

			return (
				<div class={c()} style={{ maxHeight: `${listHeight.value}px` }} onScroll={virtual.handleScroll}>
					{props.loading ? renderLoading() : props.options.length ? renderOptions() : renderEmpty()}
				</div>
			);
		};

		return () => <Transition name='sy-select-dropdown-motion'>{renderPanel()}</Transition>;
	},
});
