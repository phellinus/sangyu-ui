import type { TabName } from '../Tabs.type';

/**
 * 将标签名称编码为稳定且不含空白的 DOM ID 片段
 */
export function createTabId(name: TabName): string {
	const prefix = typeof name === 'number' ? 'n' : 's';
	const encoded = String(name)
		.split('')
		.map((unit) => unit.charCodeAt(0).toString(16).padStart(4, '0'))
		.join('');
	return `${prefix}-${encoded}`;
}
