import { onBeforeUnmount } from 'vue';

// 记录当前有多少个抽屉正在锁定页面
let lockCount = 0;

// 保存锁定前的 body 样式
let originalOverflow = '';
let originalPaddingRight = '';

/**
 * 管理抽屉打开时的页面滚动锁
 */
export const useBodyScrollLock = () => {
	let locked = false;

	// 锁定页面滚动
	const lock = () => {
		if (locked || typeof document === 'undefined') {
			return;
		}
		locked = true;

		const body = document.body;

		if (lockCount === 0) {
			originalOverflow = body.style.overflow;
			originalPaddingRight = body.style.paddingRight;

			//计算滚动条宽度页面发生水平跳动
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			if (scrollbarWidth > 0) {
				const currentPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
				body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
			}
			body.style.overflow = 'hidden';
		}
		lockCount++;
	};
	// 恢复页面滚动
	const unlock = () => {
		if (!locked || typeof document === 'undefined') return;

		locked = false;
		lockCount = Math.max(0, lockCount - 1);

		// 所有抽屉都关闭后才恢复 body 样式
		if (lockCount === 0) {
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = originalPaddingRight;
		}
	};
	onBeforeUnmount(unlock);

	return {
		lock,
		unlock,
	};
};
