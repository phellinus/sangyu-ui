export interface NotificationConfig {
	_id?: string | number;
	content: string;
	title: string;
	durnation?: number; // 销毁时间，单位：秒
	type?: string; // 通知类型，可选值：success、info、warning、error
	showClose?: boolean; // 是否显示关闭按钮
	onClose?: () => void; // 关闭时的回调函数
}
