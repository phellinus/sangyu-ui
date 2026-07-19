import { defineComponent } from 'vue';

/** 标签内部的关闭按钮 */
export default defineComponent({
	name: 'SyTagClose',

	props: {
		/** 关闭按钮的无障碍描述 */
		ariaLabel: {
			type: String,
			default: '关闭标签',
		},
	},

	emits: {
		/** 校验并声明关闭事件 */
		close: (_event: MouseEvent) => true,
	},

	setup(props, { emit, slots }) {
		/**
		 * 处理关闭按钮点击
		 * 阻止事件冒泡，避免同时触发标签的 click 事件
		 */
		const handleClick = (event: MouseEvent) => {
			event.stopPropagation();
			emit('close', event);
		};

		return () => (
			<button type='button' class='sy-tag__close' aria-label={props.ariaLabel} onClick={handleClick}>
				{slots.default?.() ?? (
					<svg
						width='14'
						height='14'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						stroke-width='2'
						stroke-linecap='round'
						stroke-linejoin='round'
						aria-hidden='true'
					>
						<line x1='18' y1='6' x2='6' y2='18' />
						<line x1='6' y1='6' x2='18' y2='18' />
					</svg>
				)}
			</button>
		);
	},
});
