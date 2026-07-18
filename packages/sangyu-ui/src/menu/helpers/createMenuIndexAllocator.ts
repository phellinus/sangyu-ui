/** 创建菜单索引分配器 */
export function createMenuIndexAllocator(getPrefix: () => string = () => '') {
	let current = 0;

	return () => {
		const value = `${++current}`;
		const prefix = getPrefix();

		return prefix ? `${prefix}-${value}` : value;
	};
}
