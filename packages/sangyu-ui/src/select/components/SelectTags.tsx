import { defineComponent, PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { SelectOption, SelectValue } from '../Select.type';

export default defineComponent({
	name: 'SelectTags',
	props: {
		options: { type: Array as PropType<SelectOption[]>, default: () => [] },
		maxTagCount: Number,
		disabled: Boolean,
	},
	emits: ['remove'],
	setup(props, { emit, slots }) {
		const { c } = useClassnames('select-tags');
		/**
		 * 渲染 Tag 的删除图标。
		 */
		const renderCloseIcon = () => (
			<svg class={c('close-icon')} width='24' height='24' viewBox='0 0 48 48' fill='none' aria-hidden='true'>
				<path
					d='M14 14L34 34'
					stroke='currentColor'
					stroke-width='4'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M14 34L34 14'
					stroke='currentColor'
					stroke-width='4'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</svg>
		);

		return () => {
			const list = props.maxTagCount ? props.options.slice(0, props.maxTagCount) : props.options;
			const rest = props.maxTagCount ? props.options.length - list.length : 0;
			/**
			 * 点击删除 tag 标签。
			 * 阻止事件继续冒泡，避免触发外层 Select 的展开 / 收起行为。
			 * @param option 当前需要删除的选项
			 * @param event 当前按钮的点击事件
			 */
			const removeTag = (option: SelectOption, event: MouseEvent) => {
				event.preventDefault();
				event.stopPropagation();
				emit('remove', option.value);
			};
			return (
				<div class={c()}>
					{list.map(
						(option) =>
							slots.tag?.({
								option,
								value: option.value,
								disabled: props.disabled,
								remove: () => emit('remove', option.value as SelectValue),
							}) ?? (
								<span class={c('item')} key={String(option.value)}>
									<span class={c('label')}>{option.label}</span>
									{!props.disabled ? (
										<button
											class={c('close')}
											type='button'
											aria-label={`删除 ${option.label}`}
											onClick={(event) => removeTag(option, event)}
										>
											{renderCloseIcon()}
										</button>
									) : null}
								</span>
							),
					)}
					{rest > 0 ? <span class={c('item')}>+{rest}</span> : null}
				</div>
			);
		};
	},
});
