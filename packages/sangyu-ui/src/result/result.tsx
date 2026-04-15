import { computed, defineComponent, PropType } from 'vue';
import { getColor, getColorWithAlpha, useClassnames } from '@sangyu-ui/utils';
import { SyIcon } from '@sangyu-ui/icons';
import { ResultProps, ResultStatus } from './interface';

const statusColorMap: Record<ResultStatus, string> = {
	success: 'success',
	error: 'error',
	info: 'primary',
	warning: 'warning',
	'404': '#8d96a0',
	'403': '#d68b2a',
	'500': '#cf4e4e',
};

const statusIconMap: Record<Exclude<ResultStatus, '404' | '403' | '500'>, string> = {
	success: 'check',
	error: 'close',
	info: 'tips',
	warning: 'lightning',
};

const statusTitleMap: Record<ResultStatus, string> = {
	success: '操作成功',
	error: '操作失败',
	info: '提示信息',
	warning: '请注意当前状态',
	'404': '页面似乎走丢了',
	'403': '当前内容暂不可访问',
	'500': '服务暂时开了个小差',
};

const exceptionStatuses: ResultStatus[] = ['404', '403', '500'];

export default defineComponent({
	name: 'SyResult',
	props: {
		status: {
			type: String as PropType<ResultProps['status']>,
			default: 'info',
		},
		title: {
			type: String,
			default: '',
		},
		subTitle: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: '',
		},
		layout: {
			type: String as PropType<ResultProps['layout']>,
			default: 'default',
		},
		customStyle: {
			type: String,
			default: '',
		},
	},
	setup(props, { slots }) {
		const { c } = useClassnames('result');
		const resolvedColor = computed(() => getColor(statusColorMap[props.status]) || '#64707d');
		const surfaceColor = computed(() =>
			getColorWithAlpha(resolvedColor.value, props.layout === 'compact' ? 0.1 : 0.14),
		);
		const isException = computed(() => exceptionStatuses.includes(props.status));
		const resolvedTitle = computed(() => props.title || statusTitleMap[props.status]);
		const hasBody = computed(() => !!slots.default?.().length);
		const hasExtra = computed(() => !!slots.extra?.().length);
		const rootStyle = computed(() => [
			props.customStyle,
			{
				'--sy-result-color': resolvedColor.value,
				'--sy-result-surface': surfaceColor.value,
			},
		]);
		const getResultCls = () => ({
			[c()]: true,
			[c(props.layout)]: true,
			[c(props.status)]: true,
			[c('exception')]: isException.value,
		});

		const renderVisual = () => {
			if (slots.icon) {
				return slots.icon();
			}

			if (props.icon) {
				return <SyIcon name={props.icon} size={props.layout === 'compact' ? 28 : 36} />;
			}

			if (isException.value) {
				return <span class={c('code')}>{props.status}</span>;
			}

			return (
				<SyIcon
					name={statusIconMap[props.status as keyof typeof statusIconMap]}
					size={props.layout === 'compact' ? 28 : 40}
				/>
			);
		};

		return () => {
			const titleNode = slots.title?.() ?? resolvedTitle.value;
			const subTitleNode = slots.subTitle?.() ?? props.subTitle;

			return (
				<section
					class={getResultCls()}
					style={rootStyle.value}
					data-status={props.status}
					data-layout={props.layout}
					role='status'
					aria-live='polite'
				>
					<div class={c('visual')}>{renderVisual()}</div>
					<div class={c('main')}>
						<div class={c('title')}>{titleNode}</div>
						{subTitleNode && <div class={c('subtitle')}>{subTitleNode}</div>}
						{hasBody.value && <div class={c('body')}>{slots.default?.()}</div>}
						{hasExtra.value && <div class={c('extra')}>{slots.extra?.()}</div>}
					</div>
				</section>
			);
		};
	},
});
