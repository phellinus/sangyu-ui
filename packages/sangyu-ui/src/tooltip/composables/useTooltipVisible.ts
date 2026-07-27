import { onBeforeUnmount, ref } from 'vue';

// 管理 Tooltip 的显示状态和延迟关闭逻辑
export function useTooltipVisible() {
	const visible = ref(false);
	let leaveTimer: ReturnType<typeof setTimeout> | undefined;

	// 清除未执行的关闭任务
	const clearLeaveTimer = () => {
		if (!leaveTimer) return;

		clearTimeout(leaveTimer);
		leaveTimer = undefined;
	};

	// 立即展示 Tooltip
	const show = () => {
		clearLeaveTimer();
		visible.value = true;
	};

	// 立即隐藏 Tooltip
	const hide = () => {
		clearLeaveTimer();
		visible.value = false;
	};

	// 延迟隐藏 Tooltip 方便鼠标进入浮层内容
	const scheduleHide = (delay = 200) => {
		clearLeaveTimer();

		leaveTimer = setTimeout(() => {
			visible.value = false;
			leaveTimer = undefined;
		}, delay);
	};

	// 点击触发时切换显示状态
	const toggle = () => {
		return visible.value ? hide() : show();
	};

	onBeforeUnmount(clearLeaveTimer);

	return {
		visible,
		show,
		hide,
		toggle,
		scheduleHide,
		clearLeaveTimer,
	};
}
