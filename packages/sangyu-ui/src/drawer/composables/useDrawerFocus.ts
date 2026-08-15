import { nextTick, onBeforeUnmount, Ref } from 'vue';

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
	'[contenteditable="true"]',
].join(',');

interface UseDrawerFocusOptions {
	// 抽屉面板元素
	panelRef: Ref<HTMLElement | undefined>;

	// 是否支持 Esc 关闭
	keyboard: () => boolean;

	// 是否启用焦点循环
	trapFocus: () => boolean;

	// 是否自动聚焦抽屉
	autoFocus: () => boolean;

	// 是否恢复打开前的焦点
	restoreFocus: () => boolean;

	// 当前抽屉是否位于最顶层
	isTopmost: () => boolean;

	// Esc 关闭回调
	onEscape: (event: KeyboardEvent) => void;
}
/**
 * 获取抽屉内可以获取焦点的元素
 * @param panel
 */
const getFocusableElements = (panel: HTMLElement): HTMLElement[] => {
	return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((element) => {
		const style = window.getComputedStyle(element);
		return !element.hidden && style.display !== 'none' && style.visibility !== 'hidden';
	});
};

/**
 * 管理抽屉的键盘交互和焦点状态
 */
export const useDrawerFocus = (options: UseDrawerFocusOptions) => {
	let listening = false;
	let previousActiveElement: HTMLElement | null = null;

	// 处理 Esc 和 Tab 键
	const handleKeydown = (event: KeyboardEvent) => {
		if (!options.isTopmost()) return;

		if (event.key === 'Escape' && options.keyboard()) {
			event.preventDefault();
			event.stopPropagation();
			options.onEscape(event);
			return;
		}

		if (event.key !== 'Tab' || !options.trapFocus()) {
			return;
		}

		const panel = options.panelRef.value;

		if (!panel) return;

		const focusableElements = getFocusableElements(panel);

		// 没有可聚焦元素时将焦点留在面板上
		if (!focusableElements.length) {
			event.preventDefault();
			panel.focus();
			return;
		}

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		const activeElement = document.activeElement as HTMLElement | null;

		// Shift + Tab 在第一个元素处回到最后一个元素
		if (event.shiftKey) {
			if (
				activeElement === firstElement ||
				activeElement === panel ||
				!activeElement ||
				!panel.contains(activeElement)
			) {
				event.preventDefault();
				lastElement.focus();
			}

			return;
		}

		// Tab 在最后一个元素处回到第一个元素
		if (
			activeElement === lastElement ||
			activeElement === panel ||
			!activeElement ||
			!panel.contains(activeElement)
		) {
			event.preventDefault();
			firstElement.focus();
		}
	};

	// 激活抽屉焦点管理
	const activate = async () => {
		if (listening || typeof document === 'undefined') {
			return;
		}

		listening = true;

		// 只在第一次打开时保存原来的焦点
		if (!previousActiveElement) {
			const activeElement = document.activeElement;

			if (activeElement instanceof HTMLElement) {
				previousActiveElement = activeElement;
			}
		}

		document.addEventListener('keydown', handleKeydown);

		await nextTick();

		if (options.autoFocus()) {
			options.panelRef.value?.focus();
		}
	};

	// 停止监听键盘事件
	const deactivate = () => {
		if (!listening || typeof document === 'undefined') {
			return;
		}

		listening = false;

		document.removeEventListener('keydown', handleKeydown);
	};

	// 将焦点恢复到打开抽屉前的元素
	const restore = () => {
		if (options.restoreFocus() && previousActiveElement?.isConnected) {
			previousActiveElement.focus();
		}

		previousActiveElement = null;
	};

	onBeforeUnmount(() => {
		deactivate();
		restore();
	});

	return {
		activate,
		deactivate,
		restore,
	};
};
