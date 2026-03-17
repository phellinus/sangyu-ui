import { defineComponent } from 'vue';
import { MenuItemProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent(
	(props: MenuItemProps, { slots }) => {
		const { c } = useClassnames('menu-item');
		const menuItemCls = {
			[c()]: true,
		};
		return () => {
			return <li class={menuItemCls}>{slots.default?.()}</li>;
		};
	},
	{
		name: 'SyMenuItem',
	},
);
