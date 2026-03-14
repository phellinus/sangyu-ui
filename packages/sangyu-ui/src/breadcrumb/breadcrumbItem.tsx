import { defineComponent } from 'vue';
import { BreadcrumbItemProps } from './interface';

export default defineComponent(
	(props: BreadcrumbItemProps, { slots }) => {
		return () => {
			return <div>12313</div>;
		};
	},
	{
		name: 'SyBreadcrumbItem',
	},
);
