import { defineComponent, inject } from 'vue';
import { BreadcrumbItemProps } from './interface';
import { breadcrumbKey } from './breadcrumb';

export default defineComponent(
	(props: BreadcrumbItemProps, { slots, emit }) => {
		const breadcrumbContext = inject<{
			separator: string;
			separatorIcon: string;
		}>(breadcrumbKey, {
			separator: '/',
			separatorIcon: '',
		});
		const isLast = () => props.index === props.total - 1;
		const handleClick = () => {
			emit('click', props.to);
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
							{breadcrumbContext.separatorIcon || breadcrumbContext.separator}
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
