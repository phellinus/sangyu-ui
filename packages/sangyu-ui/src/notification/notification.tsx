import { defineComponent, ref, TransitionGroup } from 'vue';
import { NotificationConfig } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'SyNotification',
	setup() {
		const data = ref<NotificationConfig[]>([]);
		let index = 0;
		const add = () => {
			data.value.push({
				_id: Date.now() + index,
				title: `通知标题${index}`,
				content: `通知测试数据${index++}`,
			});
		};
		const remove = () => {
			data.value.shift();
		};
		const { c } = useClassnames('notification');
		const notificationCls = {
			[c()]: true,
		};
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
					<button onClick={remove}>减少</button>
					<button onClick={add}>添加通知</button>
					<TG name='sy-notification' tag='div' class={notificationCls}>
						{renderNotification()}
					</TG>
				</>
			);
		};
	},
});
