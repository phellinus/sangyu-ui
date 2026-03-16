import { defineComponent } from 'vue';
import { MenuItemProps } from './interface';

export default defineComponent(
	(props: MenuItemProps, { slots }) => {
		return () => {
			return <div>123</div>;
		};
	},
	{
		name: 'SyMenuItem',
	},
);
