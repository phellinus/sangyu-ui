import { defineComponent, onMounted, ref, TransitionGroup } from 'vue';
import { NotificationConfig, NotificationConfigType, NotificationInstance } from './interface';
import { useClassnames } from '@sangyu-ui/utils';
import { clamp } from 'lodash-es';

export default defineComponent<{
	onReady: (instance: NotificationInstance) => void;
}>({
	name: 'SyNotification',
	setup(props, { expose }) {
		const data = ref<NotificationConfigType[]>([]);
		let index = 0;
		// 抽离统一关闭方法
		const remove = (_id: number | string) => {
			const targetIndex = data.value.findIndex((item) => item._id === _id);
			if (targetIndex !== -1) {
				const target = data.value[targetIndex];
				if (target._timer) {
					clearTimeout(target._timer);
				}
				data.value.splice(targetIndex, 1);
			}
		};
		const add = (config: NotificationConfig) => {
			const instance: NotificationConfigType = {
				...config,
				showClose: config.showClose ?? true,
				_id: Date.now() + index++,
			};
			//如果没有设置为时间为0，直接默认3秒销毁
			if (instance.durnation !== 0) {
				instance._timer = setTimeout(() => {
					remove(instance._id);
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
			props.onReady({ add });
		};
		onMounted(() => {
			onReady();
		});
		expose({ add });
		return () => {
			const renderNotification = () => {
				const noCls = {
					[c('notify')]: true,
				};
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
						<div
							class={noCls}
							key={item._id}
							style={{ '--sy-notification-line-clamp': item.clamp ? String(item.clamp) : '' }}
						>
							{/* <div>图标</div> */}
							<div class={cls}>
								<div class={titleCls}>{item.title}</div>
								<div class={contentCls}>{item.content}</div>
							</div>
							{item.showClose && (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 640 640'
									width='16'
									height='16'
									class={'sy-notification-close'}
									onClick={() => remove(item._id)}
								>
									<path d='M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z' />
								</svg>
							)}
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
