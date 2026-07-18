<template>
	<component
		:is="tag"
		ref="rootRef"
		:class="classes"
		:style="[styles, props.customStyle]"
		v-bind="rootAttrs"
		@click="handleClick"
		@mouseover="handleMouseover"
		@mouseout="handleMouseout"
		@blur="handleBlur"
	>
		<slot v-if="props.loading" name="loading">
			<span :class="c('spinner')" aria-hidden="true" />
		</slot>

		<span :class="c('content')">
			<slot />
		</span>
	</component>
</template>

<script lang="ts" setup>
	import { useAttrs } from 'vue';
	import type { ButtonEmits, ButtonProps, ButtonSlots, SyButtonInstance } from './Button.type';
	import { useButton } from './composables';

	defineOptions({
		name: 'SyButton',
		inheritAttrs: false,
	});

	const props = withDefaults(defineProps<ButtonProps>(), {
		type: 'filled',
		nativeType: 'button',
		disabled: false,
		loading: false,
		href: '',
		target: '_self',
		rel: '',
		color: 'primary',
		textColor: '',
		size: 'default',
		radius: 'default',
		lineOrigin: 'center',
		linePosition: 'bottom',
		gradientDirection: '30deg',
		gradientColorSecondary: '',
		customStyle: '',
	});

	defineSlots<ButtonSlots>();

	const emit = defineEmits<ButtonEmits>();
	const attrs = useAttrs();

	const {
		c,
		rootRef,
		tag,
		classes,
		styles,
		rootAttrs,
		handleClick,
		handleMouseover,
		handleMouseout,
		handleBlur,
		focus,
		blur,
	} = useButton(props, emit, attrs);

	defineExpose<SyButtonInstance>({
		focus,
		blur,
	});
</script>
