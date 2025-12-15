<template>
	<component :is="resolvedIcon" v-if="resolvedIcon" v-bind="mergedAttrs" />
	<span v-else class="sy-icon sy-icon--placeholder" :style="iconStyle">
		<slot />
	</span>
</template>

<script setup lang="ts">
	import type { Component, CSSProperties, PropType, StyleValue } from 'vue';
	import { computed, useAttrs, watchEffect } from 'vue';
	import { getIconComponent } from './registry';
	import { getColor } from '@sangyu-ui/utils';

	declare const __DEV__: boolean | undefined;

	defineOptions({
		name: 'SyIcon',
		inheritAttrs: false,
	});

	type IconComponent = Component;

	const props = defineProps({
		name: {
			type: String,
			default: '',
		},
		component: {
			type: Object as PropType<IconComponent | null>,
			default: null,
		},
		size: {
			type: [String, Number],
			default: '1em',
		},
		color: {
			type: String,
			default: undefined,
		},
		strokeWidth: {
			type: Number,
			default: undefined,
		},
		spin: {
			type: Boolean,
			default: false,
		},
	});

	const attrs = useAttrs();

	const normalizedSize = computed(() => {
		if (typeof props.size === 'number') {
			return `${props.size}px`;
		}

		return props.size || '1em';
	});

	const iconStyle = computed<CSSProperties>(() => {
		const size = normalizedSize.value;
		const style: CSSProperties = {
			fontSize: size,
		};

		if (props.color) {
			style.color = getColor(props.color);
		}

		style.width = size;
		style.height = size;

		return style;
	});

	const resolvedIcon = computed<IconComponent | undefined>(() => {
		if (props.component) {
			return props.component;
		}

		if (!props.name) {
			return undefined;
		}

		return getIconComponent(props.name);
	});

	const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : false;

	watchEffect(() => {
		if (isDev && props.name && !resolvedIcon.value) {
			console.warn(`[SyIcon] icon "${props.name}" was not found in the registry.`);
		}
	});

	const mergedAttrs = computed(() => {
		const {
			class: classAttr,
			style: styleAttr,
			strokeWidth,
			'stroke-width': strokeWidthKebab,
			...restAttrs
		} = attrs;
		const styleList: StyleValue[] = [];

		if (styleAttr) {
			styleList.push(styleAttr as StyleValue);
		}

		styleList.push(iconStyle.value);

		const resolvedStrokeWidth =
			props.strokeWidth ??
			(strokeWidth as number | string | undefined) ??
			(strokeWidthKebab as number | string | undefined);

		return {
			...restAttrs,
			class: ['sy-icon', classAttr, props.spin ? 'sy-icon--spin' : null],
			style: styleList.length === 1 ? styleList[0] : styleList,
			...(resolvedStrokeWidth !== undefined ? { 'stroke-width': resolvedStrokeWidth } : {}),
		};
	});
</script>

<style scoped>
	.sy-icon {
		display: inline-flex;
		line-height: 1;
		vertical-align: middle;
		width: 1em;
		height: 1em;
	}

	.sy-icon--spin {
		animation: sy-icon-spin 1s linear infinite;
	}

	.sy-icon--placeholder {
		align-items: center;
		justify-content: center;
		font-size: 0.75em;
	}

	@keyframes sy-icon-spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
