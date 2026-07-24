import type { TableDataIndex } from '../Table.type';

/**
 * 获取数据中的值
 * @param record
 * @param dataIndex
 * @returns
 */
export function getValueByDataIndex(record: object, dataIndex?: TableDataIndex): unknown {
	if (dataIndex === undefined) return undefined;

	// 字符串同时支持普通字段和点路径
	const paths = Array.isArray(dataIndex)
		? dataIndex
		: typeof dataIndex === 'string'
			? dataIndex.split('.')
			: [dataIndex];

	return paths.reduce<unknown>((current, path) => {
		if (current === null || current === undefined) return undefined;
		return (current as Record<string | number, unknown>)[path];
	}, record);
}
