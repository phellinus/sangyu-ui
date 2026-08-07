import { ComputedRef, CSSProperties, Ref } from 'vue';

export type NamePath = string | number | Array<string | number>;
//表单的布局
export type FormLayout = 'horizontal' | 'vertical' | 'inline';
//表单的标签对齐方式
export type FormLabelAlign = 'left' | 'right';
//表单的尺寸
export type FormSize = 'small' | 'default' | 'large';
//表单校验的触发方式，change-字段值发生改变时触发校验，blur-字段失去焦点时触发校验
export type ValidateTrigger = 'change' | 'blur';
//表单的校验状态
export type ValidateStatus = '' | 'validating' | 'success' | 'warning' | 'error';

/**
 * 表单字段支持的数据类型。
 */
export type FormRuleType =
	| 'string'
	| 'number'
	| 'boolean'
	| 'array'
	| 'object'
	| 'email'
	| 'url'
	| 'date'
	| 'regexp'
	| 'integer'
	| 'float'
	| 'method'
	| 'enum'
	| 'hex'
	| 'pattern'
	| 'any';

/** 表单枚举规则支持的值类型 */
export type FormRuleEnumValue = string | number | boolean | null | undefined;

/**
 * 自定义校验函数的同步返回结果。
 * undefined 或 true校验通过
 * false 校验失败，使用规则中的 message
 * string 校验失败，并将字符串作为错误信息
 * Error 校验失败，并使用 Error.message 作为错误信息
 */
export type FormValidatorResult = undefined | boolean | string | Error;

// 自定义校验函数的返回类型
export type FormValidatorReturn = FormValidatorResult | Promise<FormValidatorResult> | Promise<void>;

// 表单字段校验规则
export interface FormRule {
	// 是否为必填字段。
	required?: boolean;
	// 字段值的数据类型
	type?: FormRuleType;
	// 字段允许的最小值
	min?: number;
	// 字段允许的最大值
	max?: number;
	// 字段要求的固定长度或固定数值
	len?: number;
	// 字段允许的值集合
	enum?: FormRuleEnumValue[];
	//  字段值需要匹配的正则表达式。
	pattern?: RegExp;
	// 是否将只包含空白字符的字符串判定为空值。
	whitespace?: boolean;
	// 校验失败时展示的错误信息
	message?: string;
	// 触发当前规则校验的事件
	trigger?: ValidateTrigger | ValidateTrigger[];
	// 是否只产生警告而不阻断表单提交
	warningOnly?: boolean;
	// 校验前的数据转换函数
	transform?: (value: unknown) => unknown;
	// 自定义校验函数
	validator?: (rule: FormRule, value: unknown, model: Record<string, unknown>) => FormValidatorReturn;
}
// 表单的校验规则
export type FormRules = Record<string, FormRule | FormRule[]>;
// 表单字段滚动行为
export type FormScrollBehavior = 'auto' | 'smooth';

// 表单字段在可视区域中的对齐位置
export type FormScrollPosition = 'start' | 'center' | 'end' | 'nearest';

// 表单字段滚动配置
export interface FormScrollOptions {
	// 字段滚动时使用的动画行为
	behavior?: FormScrollBehavior;
	// 字段滚动后在垂直方向上的对齐位置
	block?: FormScrollPosition;
	// 字段滚动后在水平方向上的对齐位置
	inline?: FormScrollPosition;
}
/** 表单组件属性 */
export interface FormProps {
	// 表单数据模型，表单字段通过 name 路径读取对应的字段值
	model: Record<string, unknown>;
	// 表单校验规则
	rules?: FormRules;

	// 表单布局方式，支持水平、垂直和行内布局
	layout?: FormLayout;

	// 表单标签文字的对齐方式
	labelAlign?: FormLabelAlign;

	// 表单标签的统一宽度，传入 number 时默认按照 px 处理
	labelWidth?: string | number;

	// 是否禁用整个表单以及表单中的输入组件
	disabled?: boolean;

	// 表单内输入组件的统一尺寸
	size?: FormSize;

	// 是否在水平布局的表单标签后面显示冒号
	colon?: boolean;

	// 是否隐藏表单字段前面的必填标记
	hideRequiredMark?: boolean;

	// 表单字段默认的校验触发方式
	validateTrigger?: ValidateTrigger | ValidateTrigger[];

	// 表单校验规则发生变化时是否自动重新校验字段
	validateOnRuleChange?: boolean;

	// 表单提交失败时是否滚动到第一个校验失败的字段
	scrollToFirstError?: boolean | FormScrollOptions;

	// 表单根元素的自定义样式
	customStyle?: string | CSSProperties;
}

/** 表单字段组件属性 */
export interface FormItemProps {
	// 当前表单字段对应的数据路径
	name?: NamePath;
	// 表单字段的标签文字
	label?: string;
	// 当前字段独立配置的校验规则
	rules?: FormRule | FormRule[];
	// 当前字段是否为必填字段
	required?: boolean;
	// 当前字段触发校验的事件
	validateTrigger?: ValidateTrigger | ValidateTrigger[];
	// 当前字段的帮助信息或手动指定的错误信息
	help?: string;
	// 当前字段额外展示的说明信息
	extra?: string;
	// 手动指定当前字段的校验状态
	validateStatus?: ValidateStatus;
	// 是否显示当前字段的校验反馈状态
	hasFeedback?: boolean;
	// 当前字段标签的宽度，优先级高于 Form 的 labelWidth
	labelWidth?: string | number;
	// 是否显示当前字段的标签
	showLabel?: boolean;
	// 当前表单字段根元素的自定义样式
	customStyle?: string | CSSProperties;
}

/** 表单字段校验错误信息 */
export interface FieldError {
	// 校验失败字段的完整路径
	name: Array<string | number>;
	// 当前字段的错误信息列表
	errors: string[];
	// 当前字段的警告信息列表
	warnings?: string[];
}

/** 表单整体校验失败信息 */
export interface ValidateErrorInfo {
	// 表单校验失败时的数据模型快照
	values: Record<string, unknown>;
	// 表单中所有校验失败的字段信息
	errorFields: FieldError[];
	// 当前校验结果是否已经过期
	outOfDate: boolean;
}

/** 表单内部字段上下文 */
export interface FieldContext {
	// 当前字段的标准化路径
	name: Array<string | number>;
	// 当前字段路径转换后的唯一字符串标识
	nameKey: string;
	// 当前字段注册时保存的初始值
	initialValue: unknown;
	// 当前字段的错误信息列表
	errors: Ref<string[]>;
	// 当前字段的警告信息列表
	warnings: Ref<string[]>;
	// 当前字段的校验状态
	validateStatus: Ref<ValidateStatus>;
	// 当前字段是否已经被用户操作
	touched: Ref<boolean>;
	// 当前字段的值是否与注册时的初始值不同
	dirty: Ref<boolean>;
	// 当前字段是否正在执行异步校验
	validating: Ref<boolean>;
	// 校验当前字段
	validate: (trigger?: ValidateTrigger) => Promise<void>;
	// 将当前字段恢复为注册时的初始值并清除状态
	resetField: () => void;
	// 清除当前字段的校验状态和错误信息
	clearValidate: () => void;
	// 让当前字段中的可聚焦表单控件获得焦点
	focus: () => void;
	// 获取当前字段对应的根元素
	getElement: () => HTMLElement | undefined;
}

/** 表单组件向外暴露的实例方法 */
export interface FormInstance {
	// 校验全部字段或指定字段，校验成功后返回表单数据快照
	validateFields: (names?: NamePath[]) => Promise<Record<string, unknown>>;
	// 校验指定的单个字段
	validateField: (name: NamePath) => Promise<void>;
	// 重置全部字段或指定字段
	resetFields: (names?: NamePath[]) => void;
	// 清除全部字段或指定字段的校验状态
	clearValidate: (names?: NamePath[]) => void;
	// 将指定字段滚动到可视区域并尝试获取焦点
	scrollToField: (name: NamePath, options?: FormScrollOptions) => void;
	// 获取指定字段的错误信息列表
	getFieldError: (name: NamePath) => string[];
	// 获取全部字段或指定字段的错误信息
	getFieldsError: (names?: NamePath[]) => FieldError[];
	// 判断全部字段或指定字段是否已经被用户操作
	isFieldsTouched: (names?: NamePath[], allTouched?: boolean) => boolean;
	// 获取指定字段的当前值
	getFieldValue: (name: NamePath) => unknown;
	// 设置指定字段的值
	setFieldValue: (name: NamePath, value: unknown) => void;
}

/** 表单容器向子组件提供的上下文 */
export interface FormContext extends FormInstance {
	// 当前表单组件接收到的属性
	props: FormProps;
	// 将表单字段注册到当前表单
	registerField: (field: FieldContext) => void;
	// 根据字段唯一标识注销表单字段
	unregisterField: (nameKey: string) => void;
	// 获取指定字段最终合并后的校验规则
	getFieldRules: (name: NamePath, itemRules?: FormRule | FormRule[], required?: boolean) => FormRule[];
	// 通知表单组件当前字段已经完成校验
	emitValidate: (name: Array<string | number>, status: ValidateStatus, errors: string[]) => void;
}

/** 表单字段向内部输入组件提供的上下文 */
export interface FormItemContext {
	// 当前表单字段的标准化路径
	name?: Array<string | number>;
	// 当前表单字段是否继承 Form 的禁用状态
	disabled: ComputedRef<boolean>;
	// 当前表单字段从 Form 继承的尺寸
	size: ComputedRef<FormSize>;
	// 当前字段是否校验失败
	ariaInvalid: ComputedRef<boolean | undefined>;
	// 当前字段描述信息对应的元素 id
	ariaDescribedby: ComputedRef<string | undefined>;
	// 当前表单字段的校验状态
	validateStatus: Ref<ValidateStatus>;
	// 当前表单字段的错误信息列表
	errors: Ref<string[]>;
	// 当前表单字段的警告信息列表
	warnings: Ref<string[]>;
	// 通知 FormItem 当前字段值已经发生变化
	onChange: () => void;
	// 通知 FormItem 当前字段已经失去焦点
	onBlur: () => void;
}
