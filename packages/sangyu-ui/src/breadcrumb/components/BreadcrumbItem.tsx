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
		/** 只有存在点击处理器且不是当前页时才允许交互 */
		const clickable = computed(
			() => Boolean(props.to) && !props.isLast && Boolean(breadcrumbContext?.clickable.value),
		);

		const handleClick = () => {
			if (!clickable.value) return;

			breadcrumbContext?.handleItemClick(props.to);
		};

		const handleKeydown = (event: KeyboardEvent) => {
			if (!clickable.value || (event.key !== 'Enter' && event.key !== ' ')) {
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
							'is-link': clickable.value,
							'is-last': props.isLast,
						},
					]}
					role={clickable.value ? 'link' : undefined}
					tabindex={clickable.value ? 0 : undefined}
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
