import { defineComponent, onMounted, PropType, ref, TransitionGroup } from 'vue';
import { NotificationConfig, NotificationConfigType, NotificationInstance } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export default defineComponent({
	name: 'SyNotification',
	props: {
		onReady: {
			type: Function as PropType<(instance: NotificationInstance) => void>,
			required: true,
		},
	},
	setup(props, { expose }) {
		const data = ref<NotificationConfigType[]>([]);
		let index = 0;
		// 抽离统一关闭方法
		const remove = (_id: number | string, action = false) => {
			const targetIndex = data.value.findIndex((item) => item._id === _id);
			if (targetIndex !== -1) {
				const target = data.value[targetIndex];
				if (target.onClose && action) {
					target.onClose();
				}
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
			return () => remove(instance._id);
		};
		const { c } = useClassnames('notification');
		const onReady = () => {
			props.onReady({ add });
		};
		onMounted(() => {
			onReady();
		});
		expose({ add });
		return () => {
			const positions: NotificationConfig['position'][] = [
				'top-right',
				'top-left',
				'bottom-right',
				'bottom-left',
			];
			const renderNotification = (items: NotificationConfigType[]) => {
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
				//渲染函数的图标
				const renderTypeIcon = (type: string | undefined) => {
					const typeIconCls = {
						[c('icon')]: true,
						[c('icon', type)]: true,
					};
					//success、info、warning、error
					switch (type) {
						case 'info':
							return (
								<>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' class={typeIconCls}>
										<path d='M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z' />
									</svg>
								</>
							);
						case 'success':
							return (
								<>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' class={typeIconCls}>
										<path d='M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z' />
									</svg>
								</>
							);
						case 'error':
							return (
								<>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' class={typeIconCls}>
										<path d='M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z' />
									</svg>
								</>
							);
						case 'warning':
							return (
								<>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' class={typeIconCls}>
										<path d='M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z' />
									</svg>
								</>
							);
						default:
							return null;
					}
				};
				return items.map((item) => {
					return (
						<div
							class={noCls}
							key={item._id}
							style={{ '--sy-notification-line-clamp': item.clamp ? String(item.clamp) : '' }}
						>
							{renderTypeIcon(item.type)}
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
									onClick={() => remove(item._id, true)}
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
					{positions.map((position) => {
						const items = data.value.filter((item) => (item.position ?? 'top-right') === position);
						if (!items.length) {
							return null;
						}
						const notificationCls = {
							[c()]: true,
							[c('position', position)]: true,
						};
						return (
							<TG key={position} name={`sy-notification-${position}`} tag='div' class={notificationCls}>
								{renderNotification(items)}
							</TG>
						);
					})}
				</>
			);
		};
	},
});
