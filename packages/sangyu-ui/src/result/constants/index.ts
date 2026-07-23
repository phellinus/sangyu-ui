import type { ResultExceptionStatus, ResultLayout, ResultNormalStatus, ResultStatus } from '../Result.type';

/** 默认 Result 状态 */
export const DEFAULT_RESULT_STATUS: ResultStatus = 'info';

/** 默认 Result 布局 */
export const DEFAULT_RESULT_LAYOUT: ResultLayout = 'default';

/** 颜色解析失败时使用的兜底颜色 */
export const DEFAULT_RESULT_COLOR = '#64707d';

/** 不同状态对应的主题色 */
export const RESULT_STATUS_COLOR_MAP: Record<ResultStatus, string> = {
	success: 'success',
	error: 'error',
	info: 'primary',
	warning: 'warning',
	'403': '#d68b2a',
	'404': '#8d96a0',
	'500': '#cf4e4e',
};

/** 普通状态对应的默认图标 */
export const RESULT_STATUS_ICON_MAP: Record<ResultNormalStatus, string> = {
	success: 'check',
	error: 'close',
	info: 'tips',
	warning: 'lightning',
};

/** 不同状态对应的默认标题 */
export const RESULT_STATUS_TITLE_MAP: Record<ResultStatus, string> = {
	success: '操作成功',
	error: '操作失败',
	info: '提示信息',
	warning: '请注意当前状态',
	'403': '当前内容暂不可访问',
	'404': '页面似乎走丢了',
	'500': '服务暂时开了个小差',
};

/** Result 支持的异常状态 */
export const RESULT_EXCEPTION_STATUSES: ResultExceptionStatus[] = ['403', '404', '500'];

/** 不同布局下的默认图标尺寸 */
export const RESULT_ICON_SIZE_MAP: Record<ResultLayout, number> = {
	default: 40,
	compact: 28,
};

/** 不同布局下的自定义图标尺寸 */
export const RESULT_CUSTOM_ICON_SIZE_MAP: Record<ResultLayout, number> = {
	default: 36,
	compact: 28,
};

/** 不同布局下的状态背景透明度 */
export const RESULT_SURFACE_ALPHA_MAP: Record<ResultLayout, number> = {
	default: 0.14,
	compact: 0.1,
};

/** 判断当前状态是否为异常状态 */
export function isResultExceptionStatus(status: ResultStatus): status is ResultExceptionStatus {
	return RESULT_EXCEPTION_STATUSES.includes(status as ResultExceptionStatus);
}
