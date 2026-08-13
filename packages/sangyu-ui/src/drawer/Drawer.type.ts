import { CSSProperties } from 'vue';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';
//指定抽屉挂载位置
export type DrawerContainer = string | HTMLElement | (() => HTMLElement) | false;
export interface DrawerProps {
	// 抽屉是否可见
	visible?: boolean;
	// 抽屉标题
	title?: string;
	// 抽屉出现的方向
	placement?: DrawerPlacement;
	// 左右方向抽屉的宽度
	width?: string | number;
	// 上下方向抽屉的高度
	height?: string | number;
	// 是否显示关闭按钮
	closable?: boolean;
	// 是否显示遮罩
	mask?: boolean;
	// 点击遮罩是否关闭抽屉
	maskClosable?: boolean;
	// 抽屉层级
	zIndex?: number;
	// 关闭动画结束后是否销毁抽屉内容
	destroyOnClose?: boolean;
	// 指定抽屉挂载位置
	getContainer?: DrawerContainer;
	// 根节点自定义样式
	customStyle?: string | CSSProperties;
}

export interface DrawerEmits {
	// 更新抽屉显示状态
	(event: 'update:visible', visible: boolean): void;
	// 用户请求关闭抽屉时触发
	(event: 'close', originalEvent?: Event): void;
}
