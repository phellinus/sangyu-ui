import { defineComponent, inject } from 'vue';
import { MenuItemProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';
import { symenuKey } from './menu';

export default defineComponent(
	(props: MenuItemProps, { slots }) => {
		const menuContext = inject<{
			mode: string;
			defaultIndex: string;
			getNextIndex?: () => string;
		}>(symenuKey, {
			mode: 'vertical',
			defaultIndex: '',
		});
		const resolvedIndex = props.index ?? menuContext.getNextIndex?.() ?? '';
		const { c } = useClassnames('menu-item');
		const menuItemCls = {
			[c()]: true,
			[c('active')]: resolvedIndex == menuContext.defaultIndex,
		};
		return () => {
			return (
				<li class={menuItemCls} data-index={resolvedIndex}>
					{slots.default?.()}
				</li>
			);
		};
	},
	{
		name: 'SyMenuItem',
	},
);
