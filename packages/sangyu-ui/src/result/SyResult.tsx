import { defineComponent, PropType, type CSSProperties } from 'vue';
import { ResultContent, ResultVisual } from './components';
import { useResult } from './composables';
import { DEFAULT_RESULT_LAYOUT, DEFAULT_RESULT_STATUS } from './constants';
import type { ResultLayout, ResultProps, ResultStatus } from './Result.type';

export default defineComponent({
	name: 'SyResult',
	props: {
		status: {
			type: String as PropType<ResultStatus>,
			default: DEFAULT_RESULT_STATUS,
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
			type: String as PropType<ResultLayout>,
			default: DEFAULT_RESULT_LAYOUT,
		},

		customStyle: {
			type: [String, Object] as PropType<string | CSSProperties>,
		},
	},
	setup(props, { slots }) {
		const result = useResult(props as Readonly<ResultProps>);

		return () => (
			<section
				class={result.classes.value}
				style={result.styles.value}
				data-status={result.status.value}
				data-layout={result.layout.value}
				role={result.role.value}
				aria-live={result.ariaLive.value}
			>
				<ResultVisual status={result.status.value} layout={result.layout.value} icon={props.icon}>
					{{
						default: slots.icon,
					}}
				</ResultVisual>

				<ResultContent title={result.resolvedTitle.value} subTitle={props.subTitle}>
					{{
						title: slots.title,
						subTitle: slots.subTitle,
						default: slots.default,
						extra: slots.extra,
					}}
				</ResultContent>
			</section>
		);
	},
});
