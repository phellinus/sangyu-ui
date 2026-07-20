import { defineComponent, onMounted, PropType, TransitionGroup } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import { NotificationItem } from './components';
import { useNotification } from './composables';
import { NOTIFICATION_POSITIONS } from './constants';
import type { NotificationManager } from './Notification.type';

export default defineComponent({
	name: 'SyNotificationContainer',
	props: {
		/** 容器挂载完成后，将内部管理器交给函数式服务 */
		onReady: {
			type: Function as PropType<(manager: NotificationManager) => void>,
			required: true,
		},
	},
	setup(props, { expose }) {
		const { c } = useClassnames('notification');

		const { getByPosition, add, remove, clear } = useNotification();

		const manager: NotificationManager = {
			add,
			remove,
			clear,
		};
		expose(manager);

		onMounted(() => {
			props.onReady(manager);
		});

		/**
		 * Vue 对 TransitionGroup 的 TSX children 类型限制较严格，
		 * 这里转换类型，避免影响实际运行时行为。
		 */
		const NotificationTransition = TransitionGroup as any;

		return () => (
			<>
				{NOTIFICATION_POSITIONS.map((position) => {
					const items = getByPosition(position);

					/**
					 * 没有通知时不渲染对应位置容器，
					 * 避免页面中长期存在空的 fixed 节点。
					 */
					if (!items.length) return null;

					return (
						<NotificationTransition
							key={position}
							tag='div'
							name={`sy-notification-${position}`}
							class={[c(), c('position', position)]}
						>
							{items.map((item) => (
								<NotificationItem
									key={item.id}
									notification={item}
									onClose={() => remove(item.id, true)}
								/>
							))}
						</NotificationTransition>
					);
				})}
			</>
		);
	},
});
