import { defineComponent, PropType, type CSSProperties } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import NotificationIcon from './NotificationIcon';
import type { NotificationRecord } from '../Notification.type';

export default defineComponent({
	name: 'NotificationItem',
	props: {
		notification: {
			type: Object as PropType<NotificationRecord>,
			required: true,
		},
	},
	emits: ['close'],
	setup(props, { emit }) {
		const { c } = useClassnames('notification');

		return () => {
			const item = props.notification;

			const contentStyle = {
				'--sy-notification-line-clamp': String(item.clamp),
			} as CSSProperties;

			return (
				<article
					class={c('notify')}
					role={item.type === 'error' ? 'alert' : 'status'}
					aria-live={item.type === 'error' ? 'assertive' : 'polite'}
				>
					{item.type && <NotificationIcon type={item.type} />}

					<div class={c('wrapper')}>
						<div class={c('wrapper', 'title')}>{item.title}</div>

						<div class={c('wrapper', 'content')} style={contentStyle}>
							{item.content}
						</div>
					</div>

					{item.showClose && (
						<button type='button' class={c('close')} aria-label='关闭通知' onClick={() => emit('close')}>
							<svg viewBox='0 0 640 640' aria-hidden='true'>
								<path d='M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z' />
							</svg>
						</button>
					)}
				</article>
			);
		};
	},
});
