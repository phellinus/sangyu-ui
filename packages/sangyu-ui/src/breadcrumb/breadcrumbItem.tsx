import { defineComponent, inject, PropType } from 'vue';
import { BreadcrumbItemProps } from './interface';
import { breadcrumbKey } from './breadcrumb';
import { SyIcon } from '@sangyu-ui/icons';

export default defineComponent({
	name: 'SyBreadcrumbItem',
	props: {
		to: {
			type: String as PropType<BreadcrumbItemProps['to']>,
			default: '',
		},
		index: {
			type: Number as PropType<BreadcrumbItemProps['index']>,
			default: 0,
		},
		total: {
			type: Number as PropType<BreadcrumbItemProps['total']>,
			default: 0,
		},
	},
	setup(props, { slots }) {
		const breadcrumbContext = inject<{
			separator: string;
			separatorIcon: string;
			handleClick?: (to?: string) => void;
		}>(breadcrumbKey, {
			separator: '/',
			separatorIcon: '',
			handleClick: undefined,
		});
		const isLast = () => props.index === props.total - 1;
		const handleClick = () => {
			breadcrumbContext?.handleClick?.(props.to);
		};
		return () => {
			return (
				<span class='sy-breadcrumb-item'>
					<span
						class={[
							'sy-breadcrumb-item__inner',
							{
								'is-link': !!props.to,
								'is-last': isLast(),
							},
						]}
						onClick={handleClick}
					>
						{slots.default?.()}
					</span>

					{!isLast() && (
						<span class='sy-breadcrumb-item__separator'>
							{breadcrumbContext.separatorIcon ? (
								<SyIcon name={breadcrumbContext.separatorIcon} />
							) : (
								breadcrumbContext.separator || breadcrumbContext.separator
							)}
						</span>
					)}
				</span>
			);
		};
	},
});
