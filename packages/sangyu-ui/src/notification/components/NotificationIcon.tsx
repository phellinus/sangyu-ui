import { defineComponent, PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import { NOTIFICATION_ICON_PATHS } from '../constants';
import type { NotificationType } from '../Notification.type';

export default defineComponent({
	name: 'NotificationIcon',
	props: {
		type: {
			type: String as PropType<NotificationType>,
			required: true,
		},
	},
	setup(props) {
		const { c } = useClassnames('notification');

		return () => (
			<svg class={[c('icon'), c('icon', props.type)]} viewBox='0 0 640 640' aria-hidden='true'>
				<path d={NOTIFICATION_ICON_PATHS[props.type]} />
			</svg>
		);
	},
});
