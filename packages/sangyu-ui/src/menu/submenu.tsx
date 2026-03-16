import { defineComponent } from 'vue';
import { SubMenuProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent(
	(props: SubMenuProps, { slots }) => {
		const { c } = useClassnames('submenu');
		const submenuCls = {
			[c()]: true,
		};
		return () => {
			return (
				<div class={submenuCls} style={props.customStyle}>
					{slots.default?.()}
				</div>
			);
		};
	},
	{
		name: 'SySubMenu',
	},
);
