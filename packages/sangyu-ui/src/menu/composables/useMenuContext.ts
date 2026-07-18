import { inject, watchEffect, type ComputedRef } from 'vue';
import { MENU_INJECTION_KEY } from '../constants';
import type { MenuContext } from '../Menu.type';

export function useMenuContext() {
	const context = inject(MENU_INJECTION_KEY);

	if (!context) {
		throw new Error('[SyMenu] MenuItem 和 SubMenu 必须在 SyMenu 内使用');
	}

	return context;
}

export function useMenuRegistration(index: ComputedRef<string>, context: MenuContext = useMenuContext()) {
	watchEffect((onCleanup) => {
		if (!index.value) return;

		const unregister = context.registerItem(index.value, context.ancestors.value);

		onCleanup(unregister);
	});
}
