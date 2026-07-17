import { computed, defineComponent, inject } from 'vue';
import { SyIcon } from '@sangyu-ui/icons';
import { breadcrumbContextKey } from '../context';

export default defineComponent({
	name: 'SyBreadcrumbItem',
	props: {
		to: {
			type: String,
			default: '',
		},
		isLast: {
			type: Boolean,
			default: false,
		},
	},

	setup(props, { slots }) {
		const breadcrumbContext = inject(breadcrumbContextKey, null);
		/** 间隔值 */
		const separator = computed(() => breadcrumbContext?.separator.value ?? '/');
		/** 间隔的图标 */
		const separatorIcon = computed(() => breadcrumbContext?.separatorIcon.value ?? '');

		const handleClick = () => {
			if (!props.to) return;

			breadcrumbContext?.handleItemClick(props.to);
		};

		const handleKeydown = (event: KeyboardEvent) => {
			if (!props.to || (event.key !== 'Enter' && event.key !== ' ')) {
				return;
			}

			event.preventDefault();
			handleClick();
		};

		return () => (
			<span class='sy-breadcrumb-item'>
				<span
					class={[
						'sy-breadcrumb-item__inner',
						{
							'is-link': Boolean(props.to),
							'is-last': props.isLast,
						},
					]}
					role={props.to ? 'link' : undefined}
					tabindex={props.to ? 0 : undefined}
					aria-current={props.isLast ? 'page' : undefined}
					onClick={handleClick}
					onKeydown={handleKeydown}
				>
					{slots.default?.()}
				</span>

				{!props.isLast && (
					<span class='sy-breadcrumb-item__separator' aria-hidden='true'>
						{separatorIcon.value ? <SyIcon name={separatorIcon.value} /> : separator.value}
					</span>
				)}
			</span>
		);
	},
});
