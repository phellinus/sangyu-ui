import { defineComponent, ref } from 'vue';
import { NotificationConfig } from './interface';

export default defineComponent({
	name: 'SyNotification',
	setup() {
		const data = ref<NotificationConfig[]>([]);
		let index = 0;
		const add = () => {
			data.value.push({
				content: `通知测试数据${index++}`,
			});
		};
		const remove = () => {
			data.value.shift();
		};
		return () => {
			const renderNotification = () => {
				return data.value.map((item) => {
					return <div>{item.content}</div>;
				});
			};
			return (
				<>
					<button onClick={remove}>减少</button>
					<button onClick={add}>添加通知</button>

					{renderNotification()}
				</>
			);
		};
	},
});
