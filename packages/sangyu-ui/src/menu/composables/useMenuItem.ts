import { computed } from 'vue';
import type { MenuItemProps } from '../Menu.type';
import { useMenuContext, useMenuRegistration } from './useMenuContext';

export function useMenuItem(props: Readonly<MenuItemProps>) {
	const context = useMenuContext();
	const fallbackIndex = context.nextIndex();

	const index = computed(() => props.index || fallbackIndex);

	const active = computed(() => context.activeIndex.value === index.value);

	useMenuRegistration(index, context);

	const select = () => {
		if (props.disabled || props.pure || !index.value) {
			return;
		}

		context.select(index.value, props.to);
	};

	return {
		index,
		active,
		select,
	};
}
