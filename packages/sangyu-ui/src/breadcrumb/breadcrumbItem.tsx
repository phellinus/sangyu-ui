import { defineComponent, inject } from 'vue';
import { BreadcrumbItemProps } from './interface';
import { breadcrumbKey } from './breadcrumb';

export default defineComponent(
	(props: BreadcrumbItemProps, { slots }) => {
		const breadcrumbContext = inject<{
			separator: string;
			separatorIcon: string;
		}>(breadcrumbKey, {
			separator: '/',
			separatorIcon: '',
		});
		const isLast = () => props.index === props.total - 1;
		return () => {
			return <div>{slots.default?.()}</div>;
		};
	},
	{
		name: 'SyBreadcrumbItem',
	},
);
