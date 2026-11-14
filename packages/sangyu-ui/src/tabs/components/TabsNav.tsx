import {
	defineComponent,
	nextTick,
	onBeforeUnmount,
	onMounted,
	onUpdated,
	ref,
	type CSSProperties,
	type PropType,
	type VNode,
	type VNodeChild,
} from 'vue';
import type { TabName, TabsAlignment, TabsPosition, TabsSize, TabsType } from '../Tabs.type';
import { createTabId } from '../helpers/createTabId';
import { isTabDisabled } from '../helpers';

/** 渲染标签列表及独立的关闭和新增操作 */
export const TabsNav = defineComponent({
	name: 'TabsNav',
	props: {
		panes: { type: Array as PropType<VNode[]>, required: true },
		active: { type: [String, Number] as PropType<TabName>, default: undefined },
		focusName: { type: [String, Number] as PropType<TabName>, default: undefined },
		id: { type: String, required: true },
		type: { type: String as PropType<TabsType>, required: true },
		position: { type: String as PropType<TabsPosition>, required: true },
		alignment: { type: String as PropType<TabsAlignment>, required: true },
		size: { type: String as PropType<TabsSize>, required: true },
		removable: { type: Boolean, default: false },
		editable: { type: Boolean, default: false },
		showAddButton: { type: Boolean, default: false },
		trigger: { type: String as PropType<'click' | 'hover'>, default: 'click' },
		onRegister: {
			type: Function as PropType<(name: TabName, element: HTMLElement | null) => void>,
			required: true,
		},
		onSelect: { type: Function as PropType<(name: TabName) => void>, required: true },
		onFocus: { type: Function as PropType<(name: TabName) => void>, required: true },
		onKeydown: { type: Function as PropType<(event: KeyboardEvent, name: TabName) => void>, required: true },
		onTabClick: {
			type: Function as PropType<(name: TabName, event: MouseEvent) => void>,
			default: undefined,
		},
		onRemove: { type: Function as PropType<(name: TabName, event: MouseEvent) => void>, default: undefined },
		onAdd: { type: Function as PropType<(event: MouseEvent) => void>, default: undefined },
	},
	setup(props, { slots }) {
		const listRef = ref<HTMLElement | null>(null);
		const indicatorStyle = ref<CSSProperties>({});
		let resizeObserver: ResizeObserver | undefined;
		function updateIndicator() {
			const list = listRef.value;
			const tab = list?.querySelector<HTMLElement>('.sy-tabs__tab--active');
			const item = tab?.parentElement;
			if (!item || props.type !== 'line') {
				return;
			}
			const vertical = props.position === 'left' || props.position === 'right';
			// 指示器宽度由 CSS 控制，保留 --sy-tabs-indicator-width 的覆盖能力
			const next = vertical
				? { transform: `translateY(${item.offsetTop}px)`, height: `${item.offsetHeight}px` }
				: { transform: `translateX(${item.offsetLeft + item.offsetWidth / 2}px) translateX(-50%)` };
			if (JSON.stringify(indicatorStyle.value) !== JSON.stringify(next)) {
				indicatorStyle.value = next;
			}
		}
		onMounted(() => {
			nextTick(updateIndicator);
			if (typeof ResizeObserver !== 'undefined' && listRef.value) {
				resizeObserver = new ResizeObserver(updateIndicator);
				resizeObserver.observe(listRef.value);
			}
		});
		onUpdated(updateIndicator);
		onBeforeUnmount(() => resizeObserver?.disconnect());
		return () => {
			const extraContent = slots.extra?.();
			return (
				<div class='sy-tabs__nav-shell'>
					<div
						ref={listRef}
						role='tablist'
						aria-orientation={
							props.position === 'left' || props.position === 'right' ? 'vertical' : 'horizontal'
						}
						class={[
							'sy-tabs__list',
							`sy-tabs__list--${props.position}`,
							`sy-tabs__list--${props.alignment}`,
							`sy-tabs__list--${props.size}`,
							`sy-tabs__list--${props.type}`,
						]}
					>
						{props.panes.map((pane) => {
							const name = pane.props?.name as TabName;
							const disabled = isTabDisabled(pane);
							const closable = pane.props?.closable !== false;
							const paneSlots =
								pane.children && !Array.isArray(pane.children)
									? (pane.children as Record<string, (() => unknown) | undefined>)
									: undefined;
							const label = pane.props?.title ?? pane.props?.label ?? name;
							const canRemove = !disabled && closable && (props.removable || props.editable);
							const icon = pane.props?.icon;
							const title = (paneSlots?.title?.() as VNodeChild | undefined) ?? label;
							return (
								<div
									class={[
										'sy-tabs__tab-item',
										{ 'sy-tabs__tab-item--active': props.active === name },
									]}
									role='presentation'
									key={name}
								>
									<button
										ref={(element) => props.onRegister(name, element as HTMLElement | null)}
										type='button'
										role='tab'
										id={`${props.id}-tab-${createTabId(name)}`}
										aria-controls={`${props.id}-panel-${createTabId(name)}`}
										aria-selected={props.active === name}
										aria-disabled={disabled || undefined}
										disabled={disabled}
										tabindex={(props.focusName ?? props.active) === name ? 0 : -1}
										class={['sy-tabs__tab', { 'sy-tabs__tab--active': props.active === name }]}
										onClick={(event) => {
											props.onFocus(name);
											if (props.trigger === 'click') props.onSelect(name);
											props.onTabClick?.(name, event);
										}}
										onMouseenter={() => {
											if (props.trigger === 'hover' && !disabled) props.onSelect(name);
										}}
										onKeydown={(event) => props.onKeydown(event, name)}
									>
										{pane.props?.iconPosition !== 'right' && icon ? (
											<span class='sy-tabs__icon'>{icon as VNodeChild}</span>
										) : null}
										<span class='sy-tabs__label'>{title}</span>
										{pane.props?.iconPosition === 'right' && icon ? (
											<span class='sy-tabs__icon'>{icon as VNodeChild}</span>
										) : null}
									</button>
									{canRemove ? (
										<button
											type='button'
											class='sy-tabs__close'
											onClick={(event) => {
												// 阻止关闭操作继续触发标签切换
												event.stopPropagation();
												props.onRemove?.(name, event);
											}}
										>
											<svg
												width='14'
												height='14'
												viewBox='0 0 24 24'
												fill='none'
												aria-hidden='true'
											>
												<path
													d='M18 6 6 18M6 6l12 12'
													stroke='currentColor'
													stroke-width='2'
													stroke-linecap='round'
												/>
											</svg>
											<span class='sy-tabs__sr-only'>关闭 {String(label)}</span>
										</button>
									) : null}
								</div>
							);
						})}
						{props.type === 'line' ? (
							<span class='sy-tabs__indicator' style={indicatorStyle.value} />
						) : null}
						{props.editable && props.showAddButton ? (
							<button type='button' class='sy-tabs__add' onClick={(event) => props.onAdd?.(event)}>
								<svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
									<path
										d='M12 5v14M5 12h14'
										stroke='currentColor'
										stroke-width='2'
										stroke-linecap='round'
									/>
								</svg>
								<span class='sy-tabs__sr-only'>添加标签</span>
							</button>
						) : null}
					</div>
					{extraContent?.length ? <div class='sy-tabs__extra'>{extraContent}</div> : null}
				</div>
			);
		};
	},
});
