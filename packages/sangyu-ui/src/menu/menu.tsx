import { defineComponent, PropType, provide } from 'vue';
import { MenuProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export const symenuKey = Symbol('symenuKey');

export default defineComponent({
	name: 'SyMenu',
	props: {
		defaultIndex: {
			type: String,
			default: '1',
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
			type: Function as PropType<(selectedIndex: string) => void>,
		},
	},
	setup(props, { slots }) {
		let menuItemIndex = 0;
		provide(symenuKey, {
			mode: props.mode,
			defaultIndex: props.defaultIndex,
			getNextIndex: () => `${menuItemIndex++}`,
		});
		const { c } = useClassnames('menu');
		const menuCls = {
			[c()]: true,
			[c(props.mode)]: true,
			[c(props.verticalPosition)]: true,
		};
		const styleCss = {
			'--hover-bg-color': props.hoverBgColor || '#f0f2f4',
			'--hover-color': props.hoverColor || '#2c3034',
		};
		return () => {
			return (
				<ul class={menuCls} style={[props.customStyle, styleCss]}>
					{slots.default?.()}
				</ul>
			);
		};
	},
});
