import { NamePath } from '../Form.type';

/**
 * 将name转换成数组
 * @param name
 * @returns
 */
export function normalizeNamePath(name: NamePath): Array<string | number> {
	if (Array.isArray(name)) return [...name];

	if (typeof name === 'number') return [name];

	return name
		.split('.')
		.filter(Boolean)
		.map((item) => (/^\d+$/.test(item) ? Number(item) : item));
}
/**
 * 将name转换成字符串
 * @param name
 * @returns
 */
export function namePathToString(name: NamePath): string {
	return normalizeNamePath(name).join('.');
}
/**
 * 获取表单字段的值
 * @param model
 * @param name
 * @returns
 */
export function getValue(model: Record<string, unknown>, name: NamePath): unknown {
	return normalizeNamePath(name).reduce<unknown>((current, key) => {
		if (current == null || typeof current !== 'object') {
			return undefined;
		}

		return (current as Record<string | number, unknown>)[key];
	}, model);
}
/**
 * 设置表单字段的值
 * @param model
 * @param name
 * @param value
 * @returns
 */
export function setValue(model: Record<string, unknown>, name: NamePath, value: unknown): void {
	const path = normalizeNamePath(name);
	if (!path.length) return;

	let current: Record<string | number, unknown> = model;

	path.forEach((key, index) => {
		if (index === path.length - 1) {
			current[key] = value;
			return;
		}

		const nextKey = path[index + 1];
		const existing = current[key];

		if (!existing || typeof existing !== 'object') {
			current[key] = typeof nextKey === 'number' ? [] : {};
		}

		current = current[key] as Record<string | number, unknown>;
	});
}
