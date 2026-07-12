/**
 * 把 string / number 类型的尺寸统一转换成 number。
 * @param value 外部传入的尺寸值
 * @param fallback 无法转换时使用的默认值
 */
export const toNumber = (value: string | number | undefined, fallback: number) => {
	const num = Number.parseFloat(String(value ?? ''));
	return Number.isFinite(num) ? num : fallback;
};
