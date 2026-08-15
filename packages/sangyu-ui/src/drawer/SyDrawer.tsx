import { useClassnames } from '@sangyu-ui/utils';
import {
	computed,
	CSSProperties,
	defineComponent,
	PropType,
	nextTick,
	onMounted,
	ref,
	Teleport,
	Transition,
	useId,
	vShow,
	watch,
	withDirectives,
} from 'vue';
import { DrawerContainer, DrawerPlacement, DrawerProps } from './Drawer.type';
import { useBodyScrollLock, useDrawerFocus, useDrawerStack } from './composables';
import { SyIcon } from '@sangyu-ui/icons';

export default defineComponent({
	name: 'SyDrawer',
	inheritAttrs: false,
	props: {
		visible: Boolean,
		title: String,
		placement: {
			type: String as PropType<DrawerPlacement>,
			default: 'right',
		},
		width: {
			type: [String, Number],
			default: 320,
		},
		height: {
			type: [String, Number],
			default: 256,
		},
		closable: {
			type: Boolean,
			default: true,
		},
		mask: {
			type: Boolean,
			default: true,
		},
		maskClosable: {
			type: Boolean,
			default: true,
		},
		zIndex: {
			type: Number,
			default: 1000,
		},
		destroyOnClose: Boolean,
		getContainer: {
			type: [String, Object, Function, Boolean] as PropType<DrawerContainer>,
			default: 'body',
		},
		customStyle: {
			type: [String, Object] as PropType<DrawerProps['customStyle']>,
		},
		//是否支持esc关闭，默认关闭
		keyboard: {
			type: Boolean,
			default: true,
		},
		// 抽屉打开时是否锁定页面滚动
		lockScroll: {
			type: Boolean,
			default: true,
		},
		// 抽屉打开后是否自动获得焦点
		autoFocus: {
			type: Boolean,
			default: true,
		},
		// 是否将 Tab 焦点限制在抽屉内部
		trapFocus: {
			type: Boolean,
			default: true,
		},
		// 抽屉关闭后是否恢复原来的焦点
		restoreFocus: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['update:visible', 'close'],
	setup(props, { attrs, emit, slots }) {
		const { c, ce, cm } = useClassnames('drawer');
		const titleId = `${useId()}-title`;
		// 抽屉面板元素引用
		const panelRef = ref<HTMLElement>();
		//判断当前抽屉是否为水平方向
		const isHorizontal = computed(() => {
			return props.placement === 'left' || props.placement === 'right';
		});
		// 根据抽屉方向计算面板尺寸
		const panelStyle = computed<CSSProperties>(() => {
			const size = isHorizontal.value ? props.width : props.height;

			const normalizedSize = typeof size === 'number' ? `${size}px` : size;

			return isHorizontal.value
				? {
						width: normalizedSize,
						maxWidth: '100vw',
					}
				: {
						height: normalizedSize,
						maxHeight: '100dvh',
					};
		});
		// 获取 Teleport 的实际挂载位置
		const teleportTarget = computed<string | HTMLElement>(() => {
			if (typeof document === 'undefined' || props.getContainer === false) {
				return 'body';
			}
			const container = typeof props.getContainer === 'function' ? props.getContainer() : props.getContainer;
			if (!container) {
				return document.body;
			}
			if (typeof container === 'string') {
				return document.querySelector<HTMLElement>(container) ?? document.body;
			}
			return container;
		});
		// 通知父组件关闭抽屉
		const close = (event?: Event) => {
			emit('update:visible', false);
			emit('close', event);
		};
		//注册管理器
		const bodyScroll = useBodyScrollLock();
		const drawerStack = useDrawerStack();

		const drawerFocus = useDrawerFocus({
			panelRef,
			keyboard: () => props.keyboard,
			trapFocus: () => props.trapFocus,
			autoFocus: () => props.autoFocus,
			restoreFocus: () => props.restoreFocus,
			isTopmost: drawerStack.isTopmost,
			onEscape: (event) => close(event),
		});
		// 激活抽屉的层级 滚动锁和焦点管理
		const activateDrawer = async () => {
			drawerStack.activate();

			if (props.lockScroll) {
				bodyScroll.lock();
			}

			await drawerFocus.activate();
		};
		// 控制抽屉节点是否需要渲染,判断抽屉的dom节点是否存在
		const rendered = ref(props.visible || !props.destroyOnClose);
		// 处理遮罩点击
		const handleMaskClick = (event: MouseEvent) => {
			if (!props.maskClosable) return;

			close(event);
		};
		// 关闭动画结束后按需销毁抽屉内容
		const handleAfterLeave = () => {
			drawerFocus.deactivate();
			drawerStack.deactivate();
			bodyScroll.unlock();
			drawerFocus.restore();

			if (props.destroyOnClose) {
				rendered.value = false;
			}
		};
		// 打开抽屉前先恢复 DOM
		watch(
			() => props.visible,
			async (visible) => {
				if (visible) {
					// 先恢复 DOM 再执行焦点操作
					rendered.value = true;
					await nextTick();
					await activateDrawer();
					return;
				}
				// 关闭动画期间不再处理键盘事件
				drawerFocus.deactivate();
			},
		);
		// 动态关闭销毁功能时恢复抽屉节点
		watch(
			() => props.destroyOnClose,
			(destroyOnClose) => {
				if (!destroyOnClose) {
					rendered.value = true;
					return;
				}

				if (!props.visible) {
					rendered.value = false;
				}
			},
		);
		watch(
			() => props.lockScroll,
			(lockScroll) => {
				if (!props.visible) return;

				if (lockScroll) {
					bodyScroll.lock();
					return;
				}

				bodyScroll.unlock();
			},
		);
		onMounted(() => {
			if (props.visible) {
				void activateDrawer();
			}
		});
		// 渲染抽屉根节点
		const renderDrawer = () => {
			const titleNode = slots.title?.() ?? props.title;
			const hasHeader = Boolean(titleNode) || props.closable;

			return (
				<div
					{...attrs}
					class={{
						[c()]: true,
						[c(cm(props.placement))]: true,
					}}
					style={[
						props.customStyle,
						{
							zIndex: props.zIndex,
						},
					]}
				>
					{props.mask ? <div class={c(ce('mask'))} aria-hidden='true' onClick={handleMaskClick} /> : null}

					<section
						ref={panelRef}
						class={c(ce('panel'))}
						style={panelStyle.value}
						role='dialog'
						aria-modal={props.mask ? 'true' : undefined}
						aria-labelledby={titleNode ? titleId : undefined}
						aria-label={titleNode ? undefined : '抽屉'}
						tabindex={-1}
					>
						{hasHeader ? (
							<header class={c(ce('header'))}>
								{titleNode ? (
									<div id={titleId} class={c(ce('title'))}>
										{titleNode}
									</div>
								) : (
									<span />
								)}

								{props.closable ? (
									<button
										type='button'
										class={c(ce('close'))}
										aria-label='关闭抽屉'
										onClick={(event) => close(event)}
									>
										{slots.closeIcon?.() ?? <SyIcon name='close-small' size={20} />}
									</button>
								) : null}
							</header>
						) : null}

						<div class={c(ce('body'))}>{slots.default?.()}</div>
					</section>
				</div>
			);
		};
		return () => {
			//抽屉节点
			const drawerNode = rendered.value ? withDirectives(renderDrawer(), [[vShow, props.visible]]) : null;
			const transitionNode = (
				<Transition name='sy-drawer-motion' appear duration={280} onAfterLeave={handleAfterLeave}>
					{drawerNode}
				</Transition>
			);
			return (
				<Teleport to={teleportTarget.value} disabled={props.getContainer === false}>
					{transitionNode}
				</Teleport>
			);
		};
	},
});
