import { computed, defineComponent, type PropType } from 'vue';
import { SyIcon } from '@sangyu-ui/icons';
import { useClassnames } from '@sangyu-ui/utils';
import type { SubMenuProps } from '../Menu.type';
import { useSubMenu } from '../composables';

export default defineComponent({
	name: 'SySubMenu',

	props: {
		index: String,
		title: {
			type: String,
			default: '',
		},
		className: String,
		customStyle: {
			type: [String, Object] as PropType<SubMenuProps['customStyle']>,
		},
		disabled: Boolean,
		id: String,
		icon: String,
		onlyExpand: Boolean,
	},

	setup(props, { slots }) {
		const { c } = useClassnames('submenu');
		const { c: itemC } = useClassnames('menu-item');

		const { index, popup, open, active, toggle, select } = useSubMenu(props);

		const classes = computed(() => ({
			[c()]: true,
			'is-open': open.value,
			[c('disabled')]: props.disabled,
		}));

		const titleClasses = computed(() => ({
			[c('title')]: true,
			[c('title-active')]: active.value,
		}));

		const handleTitleClick = () => {
			if (props.disabled) return;

			toggle();
			select();
		};

		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key !== 'Enter' && event.key !== ' ') {
				return;
			}

			event.preventDefault();
			handleTitleClick();
		};

		const renderTitle = () => (
			<div
				class={titleClasses.value}
				role='menuitem'
				tabindex={props.disabled ? -1 : 0}
				aria-haspopup='menu'
				aria-expanded={popup.value ? undefined : open.value}
				aria-disabled={props.disabled || undefined}
				onClick={handleTitleClick}
				onKeydown={handleKeydown}
			>
				<div class={c('title-content')}>
					{props.icon && <SyIcon name={props.icon} size='16' class={itemC('icon')} />}

					<span>{slots.title?.() ?? props.title}</span>
				</div>

				<svg
					class={c('arrow')}
					width='14'
					height='14'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
					aria-hidden='true'
				>
					<polyline points='6 9 12 15 18 9' />
				</svg>
			</div>
		);

		return () => (
			<li
				id={props.id}
				class={[classes.value, props.className]}
				style={props.customStyle}
				data-index={index.value}
				role='none'
			>
				{renderTitle()}

				{popup.value ? (
					<ul class={c('popup')} role='menu'>
						{slots.default?.()}
					</ul>
				) : (
					<div class={c('inline')}>
						<ul class={c('inline-inner')} role='menu'>
							{slots.default?.()}
						</ul>
					</div>
				)}
			</li>
		);
	},
});
