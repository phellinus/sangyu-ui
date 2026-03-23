import { defineComponent, PropType, provide, ref, toRef } from 'vue';
import { MenuProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export const symenuKey = Symbol('symenuKey');

export default defineComponent({
	name: 'SyMenu',
	props: {
		defaultIndex: {
			type: String,
			default: '',
		},
		mode: {
			type: String as PropType<MenuProps['mode']>,
			default: 'vertical',
		},
		hoverBgColor: {
			type: String,
			default: '',
		},
		hoverColor: {
			type: String,
			default: '',
		},
		customStyle: {
			type: String,
			default: '',
		},
		verticalPosition: {
			type: String as PropType<MenuProps['verticalPosition']>,
			default: 'left',
		},
		itemPosition: {
			type: String as PropType<MenuProps['itemPosition']>,
			default: 'left',
		},
		expand: {
			type: Boolean,
			default: true,
		},
		defaultOpenSubMenus: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		onSelect: {
			type: Function as PropType<(selectedIndex: string, to?: string) => void>,
		},
	},
	setup(props, { slots }) {
		let menuItemIndex = 1;
		const activeIndex = ref(props.defaultIndex);
		const openKeys = ref([...props.defaultOpenSubMenus]);
		const handleOpenChange = (index: string) => {
			if (!index) {
				return;
			}
			if (openKeys.value.includes(index)) {
				openKeys.value = openKeys.value.filter((item) => item !== index);
				return;
			}
			openKeys.value = [...openKeys.value, index];
		};
		provide(symenuKey, {
			mode: props.mode,
			expand: toRef(props, 'expand'),
			defaultIndex: props.defaultIndex,
			getNextIndex: () => `${menuItemIndex++}`,
			activeIndex,
			onItemSelect: (index: string, to?: string) => {
				activeIndex.value = index;
				props.onSelect?.(index, to);
			},
			openKeys,
			onOpenChange: handleOpenChange,
		});
		const { c } = useClassnames('menu');
		const getMenuCls = () => ({
			[c()]: true,
			[c(props.mode)]: true,
			[c(props.verticalPosition)]: true,
			[c('collapse')]: props.mode === 'vertical' && !props.expand,
		});
		const itemPositionMap: Record<string, string> = {
			left: 'flex-start',
			center: 'center',
			right: 'flex-end',
		};
		const styleCss = {
			'--hover-bg-color': props.hoverBgColor || '#f0f2f4',
			'--hover-color': props.hoverColor || '#2c3034',
			'--menu-item-justify': itemPositionMap[props.itemPosition] || 'flex-start',
		};
		return () => {
			return (
				<ul class={getMenuCls()} style={[props.customStyle, styleCss]}>
					{slots.default?.()}
				</ul>
			);
		};
	},
});
