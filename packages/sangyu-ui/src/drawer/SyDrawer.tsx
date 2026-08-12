import { useClassnames } from '@sangyu-ui/utils';
import { computed, CSSProperties, defineComponent, PropType, useId } from 'vue';
import { DrawerPlacement, DrawerProps } from './Drawer.type';
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
		customStyle: {
			type: [String, Object] as PropType<DrawerProps['customStyle']>,
		},
	},
	emits: ['update:visible', 'close'],
	setup(props, { attrs, emit, slots }) {
		const { c, ce, cm } = useClassnames('drawer');
		const titleId = `${useId()}-title`;

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

		// 通知父组件关闭抽屉
		const close = (event?: Event) => {
			emit('update:visible', false);
			emit('close', event);
		};

		// 处理遮罩点击
		const handleMaskClick = (event: MouseEvent) => {
			if (!props.maskClosable) return;

			close(event);
		};
		return () => {
			// 当前阶段直接控制挂载 后续动画阶段再改为 Transition
			if (!props.visible) return null;

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
	},
});
