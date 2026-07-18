import { computed, defineComponent, type PropType } from 'vue';
import { SyIcon } from '@sangyu-ui/icons';
import { useClassnames } from '@sangyu-ui/utils';
import type { MenuIconPosition, MenuItemProps } from '../Menu.type';
import { useMenuItem } from '../composables';

export default defineComponent({
	name: 'SyMenuItem',

	props: {
		index: String,
		disabled: Boolean,
		customStyle: {
			type: [String, Object] as PropType<MenuItemProps['customStyle']>,
		},
		id: String,
		icon: String,
		iconPosition: {
			type: String as PropType<MenuIconPosition>,
			default: 'left',
		},
		pure: Boolean,
		to: String,
	},

	setup(props, { slots }) {
		const { c } = useClassnames('menu-item');
		const { index, active, select } = useMenuItem(props);

		const classes = computed(() => ({
			[c()]: true,
			[c('active')]: active.value,
			[c('disabled')]: props.disabled,
			[c('pure')]: props.pure,
		}));

		const iconClasses = computed(() => ({
			[c('icon')]: true,
			[c('icon-right')]: props.iconPosition === 'right',
		}));

		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key !== 'Enter' && event.key !== ' ') {
				return;
			}

			event.preventDefault();
			select();
		};

		return () => {
			const iconNode = props.icon ? <SyIcon name={props.icon} size='16' class={iconClasses.value} /> : null;

			const contentNode = <span class={c('content')}>{slots.default?.()}</span>;

			return (
				<li
					id={props.id}
					class={classes.value}
					style={props.customStyle}
					data-index={index.value}
					role='menuitem'
					tabindex={props.disabled || props.pure ? -1 : 0}
					aria-disabled={props.disabled || undefined}
					onClick={select}
					onKeydown={handleKeydown}
				>
					{props.iconPosition === 'right' ? contentNode : iconNode}

					{props.iconPosition === 'right' ? iconNode : contentNode}
				</li>
			);
		};
	},
});
