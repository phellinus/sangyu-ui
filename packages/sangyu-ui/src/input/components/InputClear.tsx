import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SyInputClear',

	props: {
		ariaLabel: {
			type: String,
			default: '清空输入内容',
		},
	},

	emits: {
		clear: (_event: MouseEvent) => true,
	},

	setup(props, { emit, slots }) {
		const handleMousedown = (event: MouseEvent) => {
			// 防止点击清空按钮时输入框先失焦。
			event.preventDefault();
		};

		const handleClick = (event: MouseEvent) => {
			event.stopPropagation();
			emit('clear', event);
		};

		return () => (
			<button
				type='button'
				class='sy-input__suffix sy-input__clear'
				aria-label={props.ariaLabel}
				onMousedown={handleMousedown}
				onClick={handleClick}
			>
				{slots.default?.() ?? (
					<svg width='1em' height='1em' viewBox='0 0 48 48' fill='none' aria-hidden='true'>
						<circle cx='24' cy='24' r='20' stroke='currentColor' stroke-width='4' />
						<path
							d='M18.343 18.343 29.657 29.657M29.657 18.343 18.343 29.657'
							stroke='currentColor'
							stroke-width='4'
							stroke-linecap='round'
						/>
					</svg>
				)}
			</button>
		);
	},
});
