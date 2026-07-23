import { defineComponent, PropType } from 'vue';
import { SyIcon } from '@sangyu-ui/icons';
import { useClassnames } from '@sangyu-ui/utils';
import {
	RESULT_CUSTOM_ICON_SIZE_MAP,
	RESULT_ICON_SIZE_MAP,
	RESULT_STATUS_ICON_MAP,
	isResultExceptionStatus,
} from '../constants';
import type { ResultLayout, ResultStatus } from '../Result.type';

export default defineComponent({
	name: 'ResultVisual',
	props: {
		/** 当前结果状态 */
		status: {
			type: String as PropType<ResultStatus>,
			required: true,
		},

		/** 当前布局类型 */
		layout: {
			type: String as PropType<ResultLayout>,
			required: true,
		},

		/** 自定义图标名称 */
		icon: {
			type: String,
			default: '',
		},
	},
	setup(props, { slots }) {
		const { c } = useClassnames('result');

		/** 渲染状态视觉内容 */
		const renderVisual = () => {
			/**
			 * icon 插槽拥有最高优先级
			 */
			const customVisual = slots.default?.();

			if (customVisual?.length) {
				return customVisual;
			}

			/**
			 * 其次使用 icon 属性指定的 SyIcon
			 */
			if (props.icon) {
				return <SyIcon name={props.icon} size={RESULT_CUSTOM_ICON_SIZE_MAP[props.layout]} />;
			}

			/**
			 * 异常状态默认使用状态码作为视觉内容
			 */
			if (isResultExceptionStatus(props.status)) {
				return <span class={c('code')}>{props.status}</span>;
			}

			/**
			 * 普通状态根据 status 显示默认图标
			 */
			return <SyIcon name={RESULT_STATUS_ICON_MAP[props.status]} size={RESULT_ICON_SIZE_MAP[props.layout]} />;
		};

		return () => (
			<div class={c('visual')} aria-hidden='true'>
				{renderVisual()}
			</div>
		);
	},
});
