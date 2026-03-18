import { defineComponent, inject } from 'vue';
import { MenuItemProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';
import { symenuKey } from './menu';

export default defineComponent(
	(props: MenuItemProps, { slots }) => {
		const menuContext = inject<{
			mode: string;
			defaultIndex: string;
		}>(symenuKey, {
			mode: 'vertical',
			defaultIndex: '',
		});
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
