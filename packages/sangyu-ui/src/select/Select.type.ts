import type { CSSProperties, VNodeChild } from 'vue';

export type SelectValue = string | number | boolean;
export type placementValue = 'top' | 'bottom';
export type SelectModelValue = SelectValue | SelectValue[] | undefined;
/** 选项数据 */
export interface SelectOption {
	label: string;
	value: SelectValue;
	disabled?: boolean;
	[key: string]: unknown;
}

export interface SySelectProps {
	/**当前选中值 */
	modelValue: SelectModelValue;
	/**选项数据 */
	options: SelectOption[];
	/** 占位提示 */
	placeholder: string;
	/**是否禁用 */
	disabled?: boolean;
	/**是否加载中 */
	loading?: boolean;
	/** 是否可清空 */
	clearable?: boolean;
	/**是否多选 */
	multiple?: boolean;
	/**是否可搜索 */
	filterable?: boolean;
	/** 远程搜索方法 */
	remoteMethod?: (query: string, signal: AbortSignal) => void | Promise<void>;
	/**
	 * 远程搜索防抖时间，单位为毫秒。
	 * @default 300
	 */
	remoteDebounce?: number;
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
	itemHeight?: string | number;
	/**下拉列表高度 */
	listHeight?: string | number;
	/**虚拟滚动额外渲染数量 */
	overscan?: number;
	/**空状态文本 */
	emptyText?: string;
	/**多选最大数量 */
	max?: number;
	/**最多展示tag数量 */
	maxTagCount?: number;
	/**自定义样式 */
	customStyle?: string | CSSProperties;
}

/** SySelect 对外暴露的事件类型 */
export interface SySelectEmits {
	/** 选中值变化时触发，用于更新 v-model */
	(event: 'update:modelValue', value: SelectModelValue): void;
	/** 选中项变化时触发，返回当前值和对应选项 */
	(event: 'change', value: SelectModelValue, option?: SelectOption | SelectOption[]): void;
	/** 点击清空按钮时触发 */
	(event: 'clear'): void;
	/** 搜索关键词变化时触发 */
	(event: 'search', query: string): void;
	/** 下拉面板展开或收起时触发 */
	(event: 'visibleChange', visible: boolean): void;
	/** 选择器获得或失去焦点时触发 */
	(event: 'focus' | 'blur', evt: FocusEvent): void;
}

/** option 插槽暴露的参数 */
export interface SelectOptionSlotProps {
	/** 当前选项数据 */
	option: SelectOption;
	/** 当前选项是否已选中 */
	selected: boolean;
	/** 当前选项是否禁用 */
	disabled: boolean;
	/** 当前选项在可见列表中的索引 */
	index: number;
}

/** label 插槽暴露的参数 */
export interface SelectLabelSlotProps {
	/** 当前回显的选项数据 */
	option?: SelectOption | SelectOption[];
	/** 当前选中值 */
	value: SelectModelValue;
}

/** suffix 插槽暴露的参数 */
export interface SelectSuffixSlotProps {
	/** 下拉面板是否展开 */
	open: boolean;
	/** 组件是否禁用 */
	disabled: boolean;
	/** 组件是否加载中 */
	loading: boolean;
}

/** tag 插槽暴露的参数 */
export interface SelectTagSlotProps {
	/** 当前 tag 对应的选项数据 */
	option: SelectOption;
	/** 当前 tag 对应的值 */
	value: SelectValue;
	/** 移除当前 tag */
	remove: () => void;
	/** 组件是否禁用 */
	disabled: boolean;
}

/** SySelect 对外暴露的插槽类型 */
export interface SySelectSlots {
	/** 默认插槽，可用于后续扩展声明式选项 */
	default?: () => VNodeChild;
	/** 自定义选项内容 */
	option?: (props: SelectOptionSlotProps) => VNodeChild;
	/** 自定义选择器内的回显内容 */
	label?: (props: SelectLabelSlotProps) => VNodeChild;
	/** 选择器前缀内容 */
	prefix?: () => VNodeChild;
	/** 选择器后缀内容，如箭头、加载图标等 */
	suffix?: (props: SelectSuffixSlotProps) => VNodeChild;
	/** 自定义空状态内容 */
	empty?: () => VNodeChild;
	/** 自定义加载状态内容 */
	loading?: () => VNodeChild;
	/** 自定义多选 tag 内容 */
	tag?: (props: SelectTagSlotProps) => VNodeChild;
}
