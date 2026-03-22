import { defineComponent, inject, provide, Ref } from 'vue';
import { SubMenuProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';
import { symenuKey } from './menu';
import { SyIcon } from '@sangyu-ui/icons';

export default defineComponent(
	(props: SubMenuProps, { slots }) => {
		const menuContext = inject<{
			mode: string;
			defaultIndex?: string;
			getNextIndex?: () => string;
			openKeys?: Ref<string[]>;
			onOpenChange?: (index: string) => void;
			activeIndex?: Ref<string>;
			onItemSelect?: (index: string, to?: string) => void;
		}>(symenuKey, {
			mode: 'vertical',
		});
		const { c } = useClassnames('submenu');
		const { c: itemC } = useClassnames('menu-item');
		const isHorizontal = () => menuContext.mode === 'horizontal';
		const resolvedIndex = props.index ?? menuContext.getNextIndex?.() ?? '';
		let subMenuItemIndex = 1;
		provide(symenuKey, {
			...menuContext,
			getNextIndex: () => (resolvedIndex ? `${resolvedIndex}-${subMenuItemIndex++}` : `${subMenuItemIndex++}`),
		});
		const isOpen = () => !!resolvedIndex && !!menuContext.openKeys?.value.includes(resolvedIndex);
		const submenuCls = () => ({
			[c()]: true,
			'is-open': !isHorizontal() && isOpen(),
		});
		const titleContent = () => slots.title?.() ?? props.title;
		const hasActiveChild = (nodes: any[], activeIndex: string): boolean => {
			return nodes.some((node) => {
				if (!node) {
					return false;
				}
				if (node?.props?.index === activeIndex) {
					return true;
				}
				const nodeChildren = node?.children;
				if (Array.isArray(nodeChildren) && hasActiveChild(nodeChildren, activeIndex)) {
					return true;
				}
				if (nodeChildren && typeof nodeChildren === 'object') {
					const defaultSlot = nodeChildren?.default;
					if (typeof defaultSlot === 'function') {
						return hasActiveChild(defaultSlot(), activeIndex);
					}
				}
				return false;
			});
		};
		const isChildActive = () => {
			const activeIndex = menuContext.activeIndex?.value;
			if (!activeIndex) {
				return false;
			}
			if (resolvedIndex && (activeIndex === resolvedIndex || activeIndex.startsWith(`${resolvedIndex}-`))) {
				return true;
			}
			const children = slots.default?.() ?? [];
			return hasActiveChild(children, activeIndex);
		};
		const titleCls = () => ({
			[c('title')]: true,
			[c('title-active')]: isChildActive(),
		});
		const handleTitleClick = () => {
			if (isHorizontal() || !resolvedIndex) {
				return;
			}
			menuContext.onOpenChange?.(resolvedIndex);
			if (!props.onlyExpand) {
				menuContext.onItemSelect?.(resolvedIndex);
			}
		};
		const titleNode = () => (
			<div class={titleCls()} onClick={handleTitleClick}>
				<div class={c('title-content')}>
					{props.icon && <SyIcon name={props.icon} size='16' class={itemC('icon')} />}
					<span>{titleContent()}</span>
				</div>
				<svg
					class={c('arrow')}
					width='14'
					height='14'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
				>
					<polyline points='6 9 12 15 18 9'></polyline>
				</svg>
			</div>
		);
		return () => {
			if (isHorizontal()) {
				return (
					<li class={submenuCls()} style={props.customStyle}>
						{titleNode()}
						<ul class={c('popup')}>{slots.default?.()}</ul>
					</li>
				);
			}
			return (
				<li class={submenuCls()} style={props.customStyle}>
					{titleNode()}
					<div class={c('inline')}>
						<ul class={c('inline-inner')}>{slots.default?.()}</ul>
					</div>
				</li>
			);
		};
	},
	{
		name: 'SySubMenu',
	},
);
