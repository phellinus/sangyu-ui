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

		return () => {
			const list = props.maxTagCount ? props.options.slice(0, props.maxTagCount) : props.options;
			const rest = props.maxTagCount ? props.options.length - list.length : 0;

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
											onClick={() => emit('remove', option.value)}
										>
											×
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
