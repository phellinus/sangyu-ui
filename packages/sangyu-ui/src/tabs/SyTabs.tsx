import {
	cloneVNode,
	computed,
	defineComponent,
	nextTick,
	onMounted,
	ref,
	shallowRef,
	useId,
	watch,
	type CSSProperties,
	type PropType,
	type VNode,
} from 'vue';
import type {
	TabName,
	TabsAlignment,
	TabsActivation,
	TabsOrientation,
	TabsPosition,
	TabsProps,
	TabsSize,
	TabsTrigger,
	TabsType,
} from './Tabs.type';
import { useTabs } from './composables';
import { createTabId, flattenChildren, isTabDisabled } from './helpers';
import { SyTabPane, TabsNav } from './components';

// 兼容同名包装节点，避免插槽包装影响面板识别
function isTabPane(node: VNode): boolean {
	return node.type === SyTabPane || (node.type as { name?: string })?.name === 'SyTabPane';
}

export const SyTabs = defineComponent({
	name: 'SyTabs',
	props: {
		modelValue: { type: [String, Number] as PropType<TabName>, default: undefined },
		defaultValue: { type: [String, Number] as PropType<TabName>, default: undefined },
		activeKey: { type: [String, Number] as PropType<TabName>, default: undefined },
		defaultActiveKey: { type: [String, Number] as PropType<TabName>, default: undefined },
		orientation: { type: String as PropType<TabsOrientation>, default: undefined },
		direction: { type: String as PropType<TabsOrientation>, default: undefined },
		tabPosition: { type: String as PropType<TabsPosition>, default: undefined },
		position: { type: String as PropType<TabsPosition>, default: undefined },
		activation: { type: String as PropType<TabsActivation>, default: 'automatic' },
		type: { type: String as PropType<TabsType>, default: 'line' },
		size: { type: String as PropType<TabsSize>, default: 'medium' },
		alignment: { type: String as PropType<TabsAlignment>, default: 'default' },
		trigger: { type: String as PropType<TabsTrigger>, default: 'click' },
		lazy: { type: Boolean, default: false },
		lazyLoad: { type: Boolean, default: undefined },
		removable: { type: Boolean, default: false },
		editable: { type: Boolean, default: false },
		showAddButton: { type: Boolean, default: false },
		autoSwitch: { type: Boolean, default: false },
		color: { type: String, default: undefined },
		className: { type: String, default: '' },
		customStyle: { type: [String, Object] as PropType<TabsProps['customStyle']>, default: undefined },
	},
	emits: ['update:modelValue', 'update:activeKey', 'change', 'tabClick', 'remove', 'delete', 'add'],
	setup(props, { slots, emit }) {
		const id = useId();
		const state = useTabs(props, emit as (event: string, ...args: unknown[]) => void);
		const tabRefs = new Map<TabName, HTMLElement>();
		const panes = shallowRef<VNode[]>([]);
		const visited = new Set<TabName>();
		const mounted = ref(false);
		onMounted(() => {
			mounted.value = true;
		});
		// 兼容方向属性和位置属性，统一计算导航方向
		const isVertical = computed(() => {
			return props.orientation === 'vertical' || props.direction === 'vertical';
		});
		const position = computed<TabsPosition>(() => {
			return isVertical.value ? 'left' : (props.tabPosition ?? props.position ?? 'top');
		});
		const orientation = computed<TabsOrientation>(() => {
			return position.value === 'left' || position.value === 'right' ? 'vertical' : 'horizontal';
		});

		// 仅在显式传入颜色时覆盖主题激活色
		const tabStyle = computed<CSSProperties>(() =>
			props.color
				? ({ '--sy-tabs-active-color': props.color, '--sy-tabs-indicator-color': props.color } as CSSProperties)
				: {},
		);
		function register(name: TabName, element: HTMLElement | null) {
			if (element) {
				tabRefs.set(name, element);
			} else {
				tabRefs.delete(name);
			}
		}
		// 等待 DOM 更新后再聚焦并滚动到可见区域
		function focus(name: TabName) {
			state.focusName.value = name;
			nextTick(() => {
				tabRefs.get(name)?.focus();
				tabRefs.get(name)?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
			});
		}
		// 自动模式跟随焦点激活，手动模式只响应 Enter 和 Space
		function keydown(event: KeyboardEvent, name: TabName) {
			const enabled = panes.value
				.filter((pane) => !isTabDisabled(pane))
				.map((pane) => pane.props?.name as TabName);
			const keys = orientation.value === 'horizontal' ? ['ArrowRight', 'ArrowLeft'] : ['ArrowDown', 'ArrowUp'];
			const index = enabled.indexOf(name);
			let next: TabName | undefined;
			if (event.key === keys[0]) {
				next = enabled[(index + 1) % enabled.length];
			} else if (event.key === keys[1]) {
				next = enabled[(index - 1 + enabled.length) % enabled.length];
			} else if (event.key === 'Home') {
				next = enabled[0];
			} else if (event.key === 'End') {
				next = enabled.at(-1);
			} else if (props.activation === 'manual' && (event.key === 'Enter' || event.key === ' ')) {
				event.preventDefault();
				state.select(name);
				return;
			}
			if (next === undefined) {
				return;
			}
			event.preventDefault();
			focus(next);
			if (props.activation === 'automatic') {
				state.select(next);
			}
		}
		// 同时发出两个兼容事件名
		function remove(name: TabName, event: MouseEvent) {
			emit('remove', name, event);
			emit('delete', name, event);
		}
		watch(
			state.active,
			(name) => {
				// 首次激活后保留懒加载面板，并将激活项滚入可视区
				if (name !== undefined) {
					visited.add(name);
				}
				if (name !== undefined) {
					nextTick(() => tabRefs.get(name)?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' }));
				}
			},
			{ immediate: true },
		);
		watch(
			() => panes.value.length,
			(length, previousLength) => {
				if (mounted.value && props.autoSwitch && length > previousLength) {
					// 可编辑模式下按需切换到新添加的最后一项
					const last = panes.value.at(-1)?.props?.name as TabName | undefined;
					if (last !== undefined) state.select(last);
				}
			},
		);
		return () => {
			const nextPanes = flattenChildren(slots.default?.() ?? []).filter(isTabPane);
			if (
				nextPanes.length !== panes.value.length ||
				nextPanes.some(
					(pane, index) =>
						pane.props?.name !== panes.value[index]?.props?.name ||
						pane.props?.disabled !== panes.value[index]?.props?.disabled,
				)
			) {
				panes.value = nextPanes;
				state.panes.value = nextPanes;
			}
			const nav = () => (
				<TabsNav
					panes={nextPanes}
					active={state.active.value}
					focusName={state.focusName.value}
					id={id}
					type={props.type}
					position={position.value}
					alignment={props.alignment}
					size={props.size}
					removable={props.removable}
					editable={props.editable}
					showAddButton={props.showAddButton}
					trigger={props.trigger}
					onRegister={register}
					onSelect={state.select}
					onFocus={focus}
					onKeydown={keydown}
					onTabClick={(name, event) => emit('tabClick', name, event)}
					onRemove={remove}
					onAdd={(event) => emit('add', event)}
					v-slots={{ extra: slots.extra }}
				/>
			);
			return (
				<div
					class={[
						'sy-tabs',
						`sy-tabs--${position.value}`,
						`sy-tabs--${props.type}`,
						`sy-tabs--${props.size}`,
						props.className,
					]}
					style={[tabStyle.value, props.customStyle]}
				>
					{position.value === 'bottom' ? (
						<>
							<div class='sy-tabs__panels'>{nextPanes.map((pane) => renderPanel(pane))}</div>
							{nav()}
						</>
					) : (
						<>
							{nav()}
							<div class='sy-tabs__panels'>{nextPanes.map((pane) => renderPanel(pane))}</div>
						</>
					)}
				</div>
			);
		};
		function renderPanel(pane: VNode) {
			const name = pane.props?.name as TabName;
			// lazy 面板首次激活前不挂载，激活后继续保留
			if ((props.lazy || props.lazyLoad) && state.active.value !== name && !visited.has(name)) return null;
			return cloneVNode(pane, {
				key: name,
				active: state.active.value === name,
				tabId: `${id}-tab-${createTabId(name)}`,
				panelId: `${id}-panel-${createTabId(name)}`,
			});
		}
	},
});

export default SyTabs;
