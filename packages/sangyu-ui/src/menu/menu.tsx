import { defineComponent, PropType } from 'vue';
import { MenuProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

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
			type: Function as PropType<(selectedIndex: string) => void>,
		},
	},
	setup(props, { slots }) {
		const { c } = useClassnames('menu');
		const menuCls = {
			[c()]: true,
			[c(props.mode)]: true,
			[c(props.verticalPosition)]: true,
		};

		return () => {
			return (
				<ul class={menuCls} style={props.customStyle}>
					{slots.default?.()}
				</ul>
			);
		};
	},
});
