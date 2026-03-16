import { defineComponent } from 'vue';
import { SubMenuProps } from './interface';

export default defineComponent(
	(props: SubMenuProps, { slots }) => {
		return () => {
			return <div>123</div>;
		};
	},
	{
		name: 'SySubMenu',
	},
);
