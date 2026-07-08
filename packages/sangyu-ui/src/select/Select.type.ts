export type SelectValue = string | number | boolean;
export type placementValue = 'top' | 'bottom';
/** 选项数据 */
export interface SelectOption {
	label: string;
	value: SelectValue;
	disabled?: boolean;
	[key: string]: unknown;
}

export interface SySelectProps {
	/**当前选中值 */
	modelValue: SelectValue;
	/**选项数据 */
	options: SelectOption[];
	/** 占位提示 */
	placeholder: string;
	/**是否禁用 */
	disabled?: boolean;
	/**是否加载中 */
	loading?: string;
	/** 是否可清空 */
	clearable?: boolean;
	/**是否多选 */
	multiple?: boolean;
	/**是否可搜索 */
	filterable?: boolean;
	/** 远程搜索方法 */
	remoteMethod?: (query: string) => void | Promise<void>;
	/** 过滤方法 */
	filterMethod?: (query: string, option: SelectOption) => boolean;
	/** 选项尺寸 */
	size?: 'small' | 'default' | 'large';
	/** 尺寸 */
	width?: string;
	/**下拉方向 */
	placement?: placementValue;
	/**是否采用虚拟滚动 */
	virtual?: boolean;
	/** 每个选项的高度 */
	itemHeight?: string;
	/**下拉列表高度 */
	listHeight?: string;
	/**虚拟滚动额外渲染数量 */
	overscan?: number;
	/**空状态文本 */
	emptyText: string;
	/**多选最大数量 */
	max: number;
	/**最多展示tag数量 */
	maxTagCount: number;
	/**自定义样式 */
	customStyle?: string;
}
