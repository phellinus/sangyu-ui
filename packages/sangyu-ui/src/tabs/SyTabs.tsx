import {
	cloneVNode,
	computed,
	defineComponent,
	Fragment,
	getCurrentInstance,
	nextTick,
	ref,
	shallowRef,
	useId,
	watch,
	type PropType,
	type VNode,
} from 'vue';
import { SyTabPane } from './SyTabPane';
import type { TabName, TabsActivation, TabsOrientation } from './Tabs.type';

function flatten(nodes: VNode[]): VNode[] {
	return nodes.flatMap((node) => (node.type === Fragment ? flatten(node.children as VNode[]) : [node]));
}

export const SyTabs = defineComponent({
	name: 'SyTabs',
	props: {
		modelValue: { type: [String, Number] as PropType<TabName>, default: undefined },
		defaultValue: { type: [String, Number] as PropType<TabName>, default: undefined },
		orientation: { type: String as PropType<TabsOrientation>, default: 'horizontal' },
		activation: { type: String as PropType<TabsActivation>, default: 'automatic' },
		lazy: { type: Boolean, default: false },
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { slots, emit }) {
		const instance = getCurrentInstance();
		const controlled = computed(() => instance?.vnode.props && 'modelValue' in instance.vnode.props);
		const internal = ref<TabName | undefined>(props.defaultValue);
		const focusName = ref<TabName | undefined>();
		const visited = new Set<TabName>();
		const tabRefs = new Map<TabName, HTMLElement>();
		const id = useId();
		const panes = shallowRef<VNode[]>([]);
		const enabled = computed(() =>
			panes.value.filter((pane) => !pane.props?.disabled).map((pane) => pane.props?.name as TabName),
		);
		const requested = computed(() => (controlled.value ? props.modelValue : internal.value));
		const active = computed(() =>
			enabled.value.includes(requested.value as TabName) ? requested.value : enabled.value[0],
		);
		watch(
			active,
			(value) => {
				if (value !== undefined) visited.add(value);
			},
			{ immediate: true },
		);
		watch(
			enabled,
			(list, old) => {
				if (
					requested.value !== undefined &&
					!list.includes(requested.value) &&
					old?.includes(requested.value)
				) {
					const previousIndex = old.indexOf(requested.value);
					const next = list[previousIndex] ?? list.at(-1);
					if (next !== undefined) select(next, true);
				}
			},
			{ flush: 'post' },
		);
		function select(name: TabName, force = false) {
			if ((!force && name === active.value) || !enabled.value.includes(name)) return;
			if (!controlled.value) internal.value = name;
			emit('update:modelValue', name);
			emit('change', name);
		}
		function focus(name: TabName) {
			focusName.value = name;
			nextTick(() => {
				tabRefs.get(name)?.focus();
				tabRefs.get(name)?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
			});
		}
		function keydown(event: KeyboardEvent, name: TabName) {
			const keys = props.orientation === 'horizontal' ? ['ArrowRight', 'ArrowLeft'] : ['ArrowDown', 'ArrowUp'];
			const list = enabled.value;
			const index = list.indexOf(name);
			let next: TabName | undefined;
			if (event.key === keys[0]) next = list[(index + 1) % list.length];
			else if (event.key === keys[1]) next = list[(index - 1 + list.length) % list.length];
			else if (event.key === 'Home') next = list[0];
			else if (event.key === 'End') next = list.at(-1);
			else if (props.activation === 'manual' && (event.key === 'Enter' || event.key === ' ')) {
				event.preventDefault();
				select(name);
				return;
			}
			if (next === undefined) return;
			event.preventDefault();
			focus(next);
			if (props.activation === 'automatic') select(next);
		}
		watch(active, (name) => {
			if (name !== undefined)
				nextTick(() => tabRefs.get(name)?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' }));
		});
		return () => {
			const nextPanes = flatten(slots.default?.() ?? []).filter(
				(node) => node.type === SyTabPane || (node.type as { name?: string })?.name === 'SyTabPane',
			);
			if (
				nextPanes.length !== panes.value.length ||
				nextPanes.some(
					(pane, index) =>
						pane.props?.name !== panes.value[index]?.props?.name ||
						pane.props?.disabled !== panes.value[index]?.props?.disabled,
				)
			)
				panes.value = nextPanes;
			return (
				<div class={['sy-tabs', `sy-tabs--${props.orientation}`]}>
					<div role='tablist' aria-orientation={props.orientation} class='sy-tabs__list'>
						{panes.value.map((pane) => {
							const name = pane.props?.name as TabName;
							const disabled = Boolean(pane.props?.disabled);
							return (
								<button
									key={name}
									ref={(el) => {
										if (el) tabRefs.set(name, el as HTMLElement);
										else tabRefs.delete(name);
									}}
									type='button'
									role='tab'
									id={`${id}-tab-${name}`}
									aria-controls={`${id}-panel-${name}`}
									aria-selected={active.value === name}
									aria-disabled={disabled || undefined}
									disabled={disabled}
									tabindex={(focusName.value ?? active.value) === name ? 0 : -1}
									class={['sy-tabs__tab', { 'sy-tabs__tab--active': active.value === name }]}
									onClick={() => {
										focusName.value = name;
										select(name);
									}}
									onKeydown={(event) => keydown(event, name)}
								>
									{pane.props?.label ?? name}
								</button>
							);
						})}
					</div>
					<div class='sy-tabs__panels'>
						{panes.value.map((pane) => {
							const name = pane.props?.name as TabName;
							if (props.lazy && active.value !== name && !visited.has(name)) return null;
							return cloneVNode(pane, {
								key: name,
								active: active.value === name,
								tabId: `${id}-tab-${name}`,
								panelId: `${id}-panel-${name}`,
							});
						})}
					</div>
				</div>
			);
		};
	},
});
