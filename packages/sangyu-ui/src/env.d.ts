declare module '*.less' {
	const content: Record<string, string>;
	export default content;
}

declare module '*.vue' {
	import type { DefineComponent } from 'vue';

	const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
	export default component;
}
