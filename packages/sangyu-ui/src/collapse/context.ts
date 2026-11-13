import type { InjectionKey } from 'vue';
import type { CollapseName } from './Collapse.type';

export interface CollapseContext {
	isExpanded: (name: CollapseName) => boolean;
	toggle: (name: CollapseName) => void;
	register: (name: CollapseName) => void;
	unregister: (name: CollapseName) => void;
}

export const collapseKey: InjectionKey<CollapseContext> = Symbol('SyCollapse');
