export interface NotificationConfig {
	content: string;
	title: string;
	durnation?: number; // 销毁时间，单位：秒
	type?: string; // 通知类型，可选值：success、info、warning、error
	showClose?: boolean; // 是否显示关闭按钮
	onClose?: () => void; // 关闭时的回调函数
}

export interface NotificationConfigType extends NotificationConfig {
	_id?: string | number;
	_timer?: ReturnType<typeof setTimeout>; // 定时器
}

export interface NotificationInstance {
	add: (config: NotificationConfig) => () => void;
}
