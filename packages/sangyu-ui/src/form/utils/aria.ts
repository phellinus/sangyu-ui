import type { AriaAttributes } from 'vue';

/** aria-invalid 支持的有效值 */
type AriaInvalidValue = Exclude<AriaAttributes['aria-invalid'], undefined>;

/**
 * 判断属性值是否为有效的 aria-invalid
 * @param value 待判断的属性值
 * @returns 是否为有效值
 */
function isAriaInvalidValue(value: unknown): value is AriaInvalidValue {
	return (
		typeof value === 'boolean' ||
		value === 'true' ||
		value === 'false' ||
		value === 'grammar' ||
		value === 'spelling'
	);
}

/**
 * 获取最终使用的 aria-invalid
 * @param value 外部传入的属性值
 * @param fallback 外部值无效时使用的值
 * @returns 最终的 aria-invalid
 */
export function resolveAriaInvalid(
	value: unknown,
	fallback?: AriaAttributes['aria-invalid'],
): AriaAttributes['aria-invalid'] {
	return isAriaInvalidValue(value) ? value : fallback;
}

/**
 * 合并多个 aria-describedby id
 * @param values 待合并的 id
 * @returns 合并后的 id 字符串
 */
export function mergeAriaIds(...values: unknown[]): string | undefined {
	const ids = values.flatMap((value) => {
		if (typeof value !== 'string') return [];

		return value.trim().split(/\s+/).filter(Boolean);
	});
	const result = [...new Set(ids)].join(' ');

	return result || undefined;
}
