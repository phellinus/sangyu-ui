import type { VNode } from 'vue';
export interface NotificationConfig {
	content: string | VNode;
	title: string | VNode;
	position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'; // 弹出位置
	durnation?: number; // 销毁时间，单位：秒
	showClose?: boolean; // 是否显示关闭按钮
	clamp?: number; // 内容折叠行数，超出部分显示省略号
	type?: string; // 通知类型，可选值：success、info、warning、error
	onClose?: () => void; // 关闭时的回调函数
	appContext?: any; //实例信息
}

export interface NotificationConfigType extends NotificationConfig {
	_id?: string | number;
	_timer?: ReturnType<typeof setTimeout>; // 定时器
}

export interface NotificationInstance {
	add: (config: NotificationConfig) => () => void;
}
