import { computed } from 'vue';
import { getColor, getColorWithAlpha, useClassnames } from '@sangyu-ui/utils';
import {
	DEFAULT_RESULT_COLOR,
	DEFAULT_RESULT_LAYOUT,
	DEFAULT_RESULT_STATUS,
	RESULT_STATUS_COLOR_MAP,
	RESULT_STATUS_TITLE_MAP,
	RESULT_SURFACE_ALPHA_MAP,
	isResultExceptionStatus,
} from '../constants';
import type { ResultLayout, ResultProps, ResultStatus } from '../Result.type';

/**
 * 统一处理 Result 的状态、样式和语义属性
 */
export function useResult(props: Readonly<ResultProps>) {
	const { c } = useClassnames('result');

	/** 标准化后的状态 */
	const status = computed<ResultStatus>(() => {
		return props.status ?? DEFAULT_RESULT_STATUS;
	});

	/** 标准化后的布局 */
	const layout = computed<ResultLayout>(() => {
		return props.layout ?? DEFAULT_RESULT_LAYOUT;
	});

	/** 当前状态是否为异常状态 */
	const isException = computed(() => {
		return isResultExceptionStatus(status.value);
	});

	/** 根据状态解析最终主题色 */
	const resolvedColor = computed(() => {
		const colorToken = RESULT_STATUS_COLOR_MAP[status.value];

		return getColor(colorToken) || DEFAULT_RESULT_COLOR;
	});

	/** 根据布局生成柔和的状态背景色 */
	const surfaceColor = computed(() => {
		return getColorWithAlpha(resolvedColor.value, RESULT_SURFACE_ALPHA_MAP[layout.value]);
	});

	/** 未传标题时使用当前状态的默认标题 */
	const resolvedTitle = computed(() => {
		return props.title || RESULT_STATUS_TITLE_MAP[status.value];
	});

	/** Result 根节点类名 */
	const classes = computed(() => ({
		[c()]: true,
		[c(layout.value)]: true,
		[c(status.value)]: true,
		[c('exception')]: isException.value,
	}));

	/** Result 根节点样式 */
	const styles = computed(() => [
		props.customStyle,
		{
			'--sy-result-color': resolvedColor.value,
			'--sy-result-surface': surfaceColor.value,
		},
	]);

	/**
	 * 错误和服务异常需要更强的无障碍提示
	 */
	const role = computed(() => {
		return status.value === 'error' || status.value === '500' ? 'alert' : 'status';
	});

	/** 根据状态生成无障碍播报级别 */
	const ariaLive = computed(() => {
		return role.value === 'alert' ? 'assertive' : 'polite';
	});

	return {
		status,
		layout,
		isException,
		resolvedTitle,
		resolvedColor,
		surfaceColor,
		classes,
		styles,
		role,
		ariaLive,
	};
}
