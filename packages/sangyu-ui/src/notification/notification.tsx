import { defineComponent, onMounted, ref, TransitionGroup } from 'vue';
import { NotificationConfig, NotificationConfigType, NotificationInstance } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent<{
	onReady: (instance: NotificationInstance) => void;
}>({
	name: 'SyNotification',
	setup(props, { expose }) {
		const data = ref<NotificationConfigType[]>([]);
		let index = 0;
		const add = (config: NotificationConfig) => {
			const instance: NotificationConfigType = {
				...config,
				_id: Date.now() + index,
			};
			//关闭当前niotification
			const close = () => {
				const index = data.value.findIndex((item) => item._id === instance._id);
				if (index !== -1) {
					data.value.splice(index, 1);
					if (instance._timer) {
						clearTimeout(instance._timer);
					}
				}
			};
			//如果没有设置为时间为0，直接默认3秒销毁
			if (instance.durnation !== 0) {
				instance._timer = setTimeout(() => {
					close();
				}, instance.durnation ?? 3000);
			}
			data.value.push(instance);
			return close;
		};
		const { c } = useClassnames('notification');
		const notificationCls = {
			[c()]: true,
		};
		const onReady = () => {
			console.log('ready');
			props.onReady({ add });
		};
		onMounted(() => {
			onReady();
		});
		expose({ add });
		return () => {
			const renderNotification = () => {
				const cls = {
					[c('wrapper')]: true,
				};
				const titleCls = {
					[c('wrapper', 'title')]: true,
				};
				const contentCls = {
					[c('wrapper', 'content')]: true,
				};
				return data.value.map((item) => {
					return (
						<div class={cls} key={item._id}>
							<div class={titleCls}>{item.title}</div>
							<div class={contentCls}>{item.content}</div>
						</div>
					);
				});
			};
			const TG = TransitionGroup as any;
			return (
				<>
					<TG name='sy-notification' tag='div' class={notificationCls}>
						{renderNotification()}
					</TG>
				</>
			);
		};
	},
});
