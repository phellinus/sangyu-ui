import { computed, defineComponent, provide, type CSSProperties, type PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { MenuEmits, MenuItemPosition, MenuMode, MenuProps, MenuVerticalPosition } from './Menu.type';
import { DEFAULT_HOVER_BG_COLOR, DEFAULT_HOVER_COLOR, DEFAULT_MENU_MODE, MENU_INJECTION_KEY } from './constants';
import { useMenu } from './composables';

export default defineComponent({
	name: 'SyMenu',
	props: {
		defaultIndex: {
			type: String,
			default: '',
		},
		mode: {
			type: String as PropType<MenuMode>,
			default: DEFAULT_MENU_MODE,
		},
		hoverBgColor: String,
		hoverColor: String,
		customStyle: {
			type: [String, Object] as PropType<MenuProps['customStyle']>,
		},
		verticalPosition: {
			type: String as PropType<MenuVerticalPosition>,
			default: 'left',
		},
		itemPosition: {
			type: String as PropType<MenuItemPosition>,
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
	},

	emits: {
		select: (_index: string, _to?: string) => true,
		openChange: (_openKeys: string[]) => true,
	},

	setup(props, { slots, emit }) {
		const { c } = useClassnames('menu');

		const { context } = useMenu(props, emit as MenuEmits);

		provide(MENU_INJECTION_KEY, context);

		const classes = computed(() => ({
			[c()]: true,
			[c(props.mode)]: true,
			[c(props.verticalPosition)]: true,
			[c('collapse')]: props.mode === 'vertical' && !props.expand,
		}));

		const itemPositionMap: Record<MenuItemPosition, string> = {
			left: 'flex-start',
			center: 'center',
			right: 'flex-end',
		};

		const cssVariables = computed(
			() =>
				({
					'--hover-bg-color': props.hoverBgColor || DEFAULT_HOVER_BG_COLOR,
					'--hover-color': props.hoverColor || DEFAULT_HOVER_COLOR,
					'--menu-item-justify': itemPositionMap[props.itemPosition],
				}) as CSSProperties,
		);

		return () => (
			<ul
				class={classes.value}
				style={[cssVariables.value, props.customStyle]}
				role='menu'
				aria-orientation={props.mode}
			>
				{slots.default?.()}
			</ul>
		);
	},
});
