import { nextTick, ref, Ref } from 'vue';
import { SelectOption } from '../Select.type';

/**
 * 管理 Select 的键盘交互。
 * 支持上下方向键移动、Enter 选择、Escape 关闭。
 */
export function useSelectKeyboard(
	options: Ref<SelectOption[]>,
	onSelect: (option: SelectOption) => void,
	close: () => void,
	onDelete?: () => boolean,
) {
	/** 当前键盘高亮的选项索引 */
	const activeIndex = ref(-1);

	/**
	 * 按方向移动高亮项。
	 * 会自动跳过 disabled 选项。
	 * @param step 移动方向，1 表示向下，-1 表示向上
	 */
	const move = (step: number) => {
		const list = options.value;
		if (!list.length) return;

		let next = activeIndex.value;
		for (let i = 0; i < list.length; i++) {
			next = (next + step + list.length) % list.length;
			if (!list[next].disabled) {
				activeIndex.value = next;
				break;
			}
		}
	};

	/**
	 * 处理键盘事件。
	 * @param event 键盘事件对象
	 */
	const handleKeydown = async (event: KeyboardEvent) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			move(1);
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			move(-1);
		}

		if (event.key === 'Enter' && activeIndex.value >= 0) {
			event.preventDefault();
			onSelect(options.value[activeIndex.value]);
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			close();
		}
		if ((event.key === 'Backspace' || event.key === 'Delete') && onDelete?.()) {
			// 已经删除选中项时，阻止输入框继续执行默认删除行为
			event.preventDefault();
		}
		await nextTick();
	};

	return {
		activeIndex,
		handleKeydown,
	};
}
