import { defineComponent, inject, Ref } from 'vue';
import { MenuItemProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';
import { symenuKey } from './menu';

export default defineComponent(
	(props: MenuItemProps, { slots, emit }) => {
		const menuContext = inject<{
			mode: string;
			defaultIndex: string;
			getNextIndex?: () => string;
			activeIndex?: Ref<string>;
			onItemSelect?: (index: string) => void;
		}>(symenuKey, {
			mode: 'vertical',
			defaultIndex: '',
		});
		const resolvedIndex = props.index ?? menuContext.getNextIndex?.() ?? '';
		const { c } = useClassnames('menu-item');
		const getMenuItemCls = () => ({
			[c()]: true,
			[c('active')]: resolvedIndex === menuContext.activeIndex?.value,
		});
		const handleClick = () => {
			if (!resolvedIndex) {
				return;
			}
			menuContext.onItemSelect?.(resolvedIndex);
		};
		return () => {
			return (
				<li class={getMenuItemCls()} data-index={resolvedIndex} onClick={handleClick}>
					{slots.default?.()}
				</li>
			);
		};
	},
	{
		name: 'SyMenuItem',
	},
);
