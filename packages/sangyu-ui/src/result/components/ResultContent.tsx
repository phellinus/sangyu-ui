import { defineComponent } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'ResultContent',
	props: {
		/** 标准化后的标题 */
		title: {
			type: String,
			required: true,
		},

		/** 副标题 */
		subTitle: {
			type: String,
			default: '',
		},
	},
	setup(props, { slots }) {
		const { c } = useClassnames('result');

		return () => {
			const titleNodes = slots.title?.();
			const subTitleNodes = slots.subTitle?.();
			const bodyNodes = slots.default?.();
			const extraNodes = slots.extra?.();

			/**
			 * 空插槽不应该覆盖属性提供的默认内容
			 */
			const titleContent = titleNodes?.length ? titleNodes : props.title;

			const subTitleContent = subTitleNodes?.length ? subTitleNodes : props.subTitle;

			const hasSubTitle = Array.isArray(subTitleContent) ? subTitleContent.length > 0 : Boolean(subTitleContent);

			const hasBody = Boolean(bodyNodes?.length);

			const hasExtra = Boolean(extraNodes?.length);

			return (
				<div class={c('main')}>
					<div class={c('title')}>{titleContent}</div>

					{hasSubTitle && <div class={c('subtitle')}>{subTitleContent}</div>}

					{hasBody && <div class={c('body')}>{bodyNodes}</div>}

					{hasExtra && <div class={c('extra')}>{extraNodes}</div>}
				</div>
			);
		};
	},
});
