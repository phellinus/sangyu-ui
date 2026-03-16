export interface MenuProps {
	defaultIndex?: string;
	mode?: 'horizontal' | 'vertical'; //菜单展示方向
	hoverBgColor?: string; //hover背景颜色
	hoverColor?: string; //hover字体颜色
	customStyle?: string; //自定义样式
	onSelect?: (selectedIndex: string) => void; //选中回调函数
	verticalPosition?: 'left' | 'right'; //垂直菜单的位置
	itemPosition?: 'left' | 'right' | 'center'; //水平菜单的菜单位置
	expand?: boolean; //是否展开
	defaultOpenSubMenus?: string[]; //默认展开的子菜单索引
}

export interface MenuItemProps {
	index?: string; //菜单项索引
	disabled?: boolean; //是否禁用
	customStyle?: string; //自定义样式
	id?: string;
	icon?: string;
	iconPosition?: 'left' | 'right'; //图标位置
	pure?: boolean; //纯展示作用，不作为子菜单
}
