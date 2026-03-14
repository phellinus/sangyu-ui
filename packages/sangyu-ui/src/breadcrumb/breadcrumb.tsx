import { defineComponent } from 'vue';
import { BreadcrumbProps } from './interface';

export default defineComponent(
	(props: BreadcrumbProps) => {
		return () => {
			return <div></div>;
		};
	},
	{
		name: 'SyBreadCrumb',
	},
);
