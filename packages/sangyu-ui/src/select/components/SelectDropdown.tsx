import { computed, defineComponent, PropType, toRef } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { SelectOption as OptionType } from '../Select.type';
import { useVirtualList } from '../composables';
import SelectOption from './SelectOption';

const toNumber = (value: string | number | undefined, fallback: number) => {
	const num = Number.parseFloat(String(value ?? ''));
	return Number.isFinite(num) ? num : fallback;
};

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

		return () => {
			if (!props.visible) return null;

			if (props.loading) {
				return <div class={c()}>{slots.loading?.() ?? <div class={c('loading')}>加载中...</div>}</div>;
			}

			if (!props.options.length) {
				return <div class={c()}>{slots.empty?.() ?? <div class={c('empty')}>{props.emptyText}</div>}</div>;
			}

			const items = props.virtual
				? virtual.visibleItems.value
				: props.options.map((item, index) => ({ item, index }));

			return (
				<div class={c()} style={{ maxHeight: `${listHeight.value}px` }} onScroll={virtual.handleScroll}>
					<div
						style={
							props.virtual
								? { height: `${virtual.totalHeight.value}px`, position: 'relative' }
								: undefined
						}
					>
						<div
							style={
								props.virtual ? { transform: `translateY(${virtual.offsetTop.value}px)` } : undefined
							}
						>
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
										{slots.option}
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
				</div>
			);
		};
	},
});
