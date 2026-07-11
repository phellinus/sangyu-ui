import { defineComponent, PropType } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { SelectOption } from '../Select.type';

export default defineComponent({
	name: 'SelectOption',
	props: {
		option: { type: Object as PropType<SelectOption>, required: true },
		selected: Boolean,
		active: Boolean,
		index: { type: Number, required: true },
	},
	emits: ['click'],
	setup(props, { emit, slots }) {
		const { c } = useClassnames('select-option');

		return () => (
			<div
				class={{
					[c()]: true,
					[c('selected')]: props.selected,
					[c('active')]: props.active,
					[c('disabled')]: props.option.disabled,
				}}
				role='option'
				aria-selected={props.selected}
				aria-disabled={props.option.disabled}
				onClick={() => emit('click', props.option)}
			>
				{slots.default?.({
					option: props.option,
					selected: props.selected,
					disabled: !!props.option.disabled,
					index: props.index,
				}) ?? <span>{props.option.label}</span>}
				{props.selected ? <span class={c('check')}>✓</span> : null}
			</div>
		);
	},
});
