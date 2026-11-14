import type { InjectionKey } from 'vue';
import type { CollapseName } from './Collapse.type';

export interface CollapseContext {
	isExpanded: (name: CollapseName) => boolean;
	toggle: (name: CollapseName) => void;
	register: (name: CollapseName) => void;
	unregister: (name: CollapseName) => void;
}

// 子项通过该 key 读取状态并注册自身
export const collapseKey: InjectionKey<CollapseContext> = Symbol('SyCollapse');
