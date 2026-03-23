import { defineComponent, inject, Ref } from 'vue';
import { MenuItemProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';
import { symenuKey } from './menu';
import { SyIcon } from '@sangyu-ui/icons';

export default defineComponent(
	(props: MenuItemProps, { slots }) => {
		const menuContext = inject<{
			mode: string;
			defaultIndex: string;
			getNextIndex?: () => string;
			activeIndex?: Ref<string>;
			onItemSelect?: (index: string, to?: string) => void;
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
		const iconCls = () => ({
			[c('icon')]: true,
			[c('icon-right')]: props.iconPosition === 'right',
		});
		const handleClick = () => {
			if (!resolvedIndex || props.pure) {
				return;
			}
			menuContext.onItemSelect?.(resolvedIndex, props.to);
		};
		return () => {
			const iconNode = props.icon ? <SyIcon name={props.icon} size='16' class={iconCls()} /> : null;
			const contentNode = <span class={c('content')}>{slots.default?.()}</span>;
			return (
				<li class={getMenuItemCls()} data-index={resolvedIndex} onClick={handleClick}>
					{props.iconPosition === 'right' ? contentNode : iconNode}
					{props.iconPosition === 'right' ? iconNode : contentNode}
				</li>
			);
		};
	},
	{
		name: 'SyMenuItem',
	},
);
