<template>
	<label :class="classes" :style="[styles, props.customStyle]">
		<input
			:id="id"
			ref="inputRef"
			:class="c('input')"
			type="checkbox"
			:name="props.name"
			:checked="checked"
			:disabled="disabled"
			:aria-checked="props.indeterminate ? 'mixed' : checked"
			@change="handleChange"
		/>

		<span :class="c('track')" aria-hidden="true">
			<span :class="c('background')" />
			<span :class="c('thumb')">
				<slot
					name="thumb"
					:checked="checked"
					:indeterminate="!!props.indeterminate"
					:disabled="disabled"
					:loading="!!props.loading"
				>
					<span v-if="props.loading" :class="c('spinner')" />
					<SyIcon
						v-else-if="props.icon && currentIconName"
						:name="currentIconName"
						:size="iconSize"
						:class="c('thumb-icon')"
					/>
					<span v-else-if="props.indeterminate" :class="c('minus')" />
				</slot>
			</span>
		</span>

		<span v-if="$slots.checked || $slots.unchecked || $slots.default || hasCustomStateText" :class="c('label')">
			<slot
				v-if="checked && $slots.checked"
				name="checked"
				:checked="checked"
				:indeterminate="!!props.indeterminate"
				:disabled="disabled"
				:loading="!!props.loading"
			/>
			<slot
				v-else-if="!checked && $slots.unchecked"
				name="unchecked"
				:checked="checked"
				:indeterminate="!!props.indeterminate"
				:disabled="disabled"
				:loading="!!props.loading"
			/>
			<slot v-else>
				{{ currentText }}
			</slot>
		</span>
	</label>
</template>

<script lang="ts" setup>
	import { computed } from 'vue';
	import { useClassnames } from '@sangyu-ui/utils';
	import { SyIcon } from '@sangyu-ui/icons';
	import type { SwitchEmits, SwitchProps } from './Switch.type';
	import { useSwitch } from './composables';

	defineOptions({
		name: 'SySwitch',
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<SwitchProps>(), {
		modelValue: false,
		activeValue: true,
		inactiveValue: false,
		disabled: false,
		loading: false,
		indeterminate: false,
		size: 'default',
		shape: 'round',
		name: '',
		color: 'primary',
		inactiveColor: '#eef1f4',
		checkedText: '',
		uncheckedText: '',
		icon: false,
		iconName: '',
		activeIconName: '',
		inactiveIconName: '',
		customStyle: '',
	});

	const emit = defineEmits<SwitchEmits>();
	const { c, cx } = useClassnames('switch');

	const {
		inputRef,
		id,
		checked,
		disabled,
		size,
		shape,
		currentText,
		currentIconName,
		hasCustomStateText,
		styles,
		handleChange,
		focus,
		blur,
	} = useSwitch(props, emit);

	const classes = cx(() => ({
		[c()]: true,
		[c(size.value)]: true,
		[c(shape.value)]: true,
		[c('checked')]: checked.value,
		[c('disabled')]: disabled.value,
		[c('loading')]: !!props.loading,
		[c('indeterminate')]: !!props.indeterminate,
		[c('with-text')]: !!currentText.value || !!hasCustomStateText.value,
		[c('with-icon')]: !!props.icon,
	}));

	const iconSize = computed(() => {
		if (size.value === 'small') return 10;
		if (size.value === 'large') return 14;
		return 12;
	});

	defineExpose({
		focus,
		blur,
	});
</script>
