import { defineComponent, inject } from 'vue';
import { BreadcrumbItemProps } from './interface';
import { breadcrumbKey } from './breadcrumb';
import { SyIcon } from '@sangyu-ui/icons';

export default defineComponent(
	(props: BreadcrumbItemProps, { slots }) => {
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
	{
		name: 'SyBreadcrumbItem',
	},
);
