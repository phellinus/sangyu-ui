import { computed, getCurrentInstance, ref, watch, type ComputedRef, type ShallowRef, type VNode } from 'vue';
import type { TabName, TabsProps } from '../Tabs.type';
import { isTabDisabled } from '../helpers';

export interface TabsState {
	active: ComputedRef<TabName | undefined>;
	focusName: ReturnType<typeof ref<TabName | undefined>>;
	panes: ShallowRef<VNode[]>;
	select: (name: TabName, force?: boolean) => void;
}

/** 管理标签的受控状态、焦点和可选面板 */
export function useTabs(props: TabsProps, emit: (event: string, ...args: unknown[]) => void): TabsState {
	const instance = getCurrentInstance();
	// 根据属性是否传入识别受控模式，兼容显式传入 undefined
	const modelValueWasProvided = !!instance?.vnode.props && 'modelValue' in instance.vnode.props;
	const activeKeyWasProvided = !!instance?.vnode.props && 'activeKey' in instance.vnode.props;
	const hasModelValue = computed(() => {
		return props.modelValue !== undefined || modelValueWasProvided;
	});
	const hasActiveKey = computed(() => {
		return props.activeKey !== undefined || activeKeyWasProvided;
	});
	const internal = ref<TabName | undefined>(props.defaultValue ?? props.defaultActiveKey);
	const focusName = ref<TabName | undefined>();
	const panes = ref<VNode[]>([]) as ShallowRef<VNode[]>;
	// 禁用面板不参与选择和键盘导航
	const enabled = computed(() => {
		return panes.value.filter((pane) => !isTabDisabled(pane)).map((pane) => pane.props?.name as TabName);
	});
	const requested = computed(() => {
		if (hasModelValue.value) {
			return props.modelValue;
		}
		if (hasActiveKey.value) {
			return props.activeKey;
		}
		return internal.value;
	});
	// 受控值无效或被禁用时回退到首个可用面板
	const active = computed(() => {
		return enabled.value.includes(requested.value as TabName) ? requested.value : enabled.value[0];
	});
	// 非受控模式更新内部值，受控模式只向外发出更新事件
	function select(name: TabName, force = false) {
		if ((!force && name === active.value) || !enabled.value.includes(name)) {
			return;
		}
		if (!hasModelValue.value && !hasActiveKey.value) {
			internal.value = name;
		}
		emit('update:modelValue', name);
		emit('update:activeKey', name);
		emit('change', name);
	}
	watch(
		enabled,
		(list, old) => {
			// 当前面板被删除或禁用时，回退到原位置的下一项
			if (requested.value !== undefined && !list.includes(requested.value) && old?.includes(requested.value)) {
				const previousIndex = old.indexOf(requested.value);
				const next = list[previousIndex] ?? list.at(-1);
				if (next !== undefined) select(next, true);
			}
		},
		{ flush: 'post' },
	);
	return { active, focusName, panes, select };
}
