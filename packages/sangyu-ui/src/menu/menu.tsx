import { defineComponent } from 'vue';
import { MenuProps } from './interface';

export default defineComponent(
	(props: MenuProps, { slots }) => {
		return () => {
			return <div>菜单项</div>;
		};
	},
	{
		name: 'SyMenu',
	},
);
