import { computed, reactive, ref } from 'vue';
import type { MenuContext, MenuEmits, MenuProps } from '../Menu.type';
import { DEFAULT_MENU_MODE } from '../constants';
import { createMenuIndexAllocator } from '../helpers';

export function useMenu(props: Readonly<MenuProps>, emit: MenuEmits) {
	const activeIndex = ref(props.defaultIndex ?? '');
	const openKeys = ref([...(props.defaultOpenSubMenus ?? [])]);

	const itemPaths = reactive(new Map<string, string[]>());

	const select = (index: string, to?: string) => {
		if (!index) return;

		activeIndex.value = index;
		emit('select', index, to);
	};

	const toggleSubMenu = (index: string) => {
		if (!index) return;

		if (openKeys.value.includes(index)) {
			openKeys.value = openKeys.value.filter((item) => item !== index);
		} else {
			openKeys.value = [...openKeys.value, index];
		}

		emit('openChange', [...openKeys.value]);
	};

	const registerItem = (index: string, ancestors: string[]) => {
		const path = [...ancestors];
		itemPaths.set(index, path);

		return () => {
			if (itemPaths.get(index) === path) {
				itemPaths.delete(index);
			}
		};
	};

	const isSubMenuOpen = (index: string) => openKeys.value.includes(index);

	const isSubMenuActive = (index: string) => {
		if (activeIndex.value === index) return true;

		return itemPaths.get(activeIndex.value)?.includes(index) ?? false;
	};

	const context: MenuContext = {
		mode: computed(() => props.mode ?? DEFAULT_MENU_MODE),
		expand: computed(() => props.expand ?? true),
		activeIndex,
		openKeys,
		ancestors: computed(() => []),
		nextIndex: createMenuIndexAllocator(),
		select,
		toggleSubMenu,
		isSubMenuOpen,
		isSubMenuActive,
		registerItem,
	};

	return {
		activeIndex,
		openKeys,
		context,
	};
}
