import { computed, provide } from 'vue';
import type { SubMenuProps } from '../Menu.type';
import { MENU_INJECTION_KEY } from '../constants';
import { createMenuIndexAllocator } from '../helpers';
import { useMenuContext, useMenuRegistration } from './useMenuContext';

export function useSubMenu(props: Readonly<SubMenuProps>) {
	const parentContext = useMenuContext();
	const fallbackIndex = parentContext.nextIndex();

	const index = computed(() => props.index || fallbackIndex);

	useMenuRegistration(index, parentContext);

	const popup = computed(
		() =>
			parentContext.mode.value === 'horizontal' ||
			(parentContext.mode.value === 'vertical' && !parentContext.expand.value),
	);

	const open = computed(() => !popup.value && parentContext.isSubMenuOpen(index.value));

	const active = computed(() => parentContext.isSubMenuActive(index.value));

	const ancestors = computed(() => [...parentContext.ancestors.value, index.value]);

	provide(MENU_INJECTION_KEY, {
		...parentContext,
		ancestors,
		nextIndex: createMenuIndexAllocator(() => index.value),
	});

	const toggle = () => {
		if (props.disabled || popup.value) return;

		parentContext.toggleSubMenu(index.value);
	};

	const select = () => {
		if (props.disabled || props.onlyExpand || !index.value) {
			return;
		}

		parentContext.select(index.value);
	};

	return {
		index,
		popup,
		open,
		active,
		toggle,
		select,
	};
}
