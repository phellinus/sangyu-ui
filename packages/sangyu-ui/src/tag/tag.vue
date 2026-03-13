<template>
	<div :class="tagCls" :style="tagStyle">
		<slot name="default"></slot>
	</div>
</template>

<script setup lang="ts">
	import { getColor, getColorWithAlpha, useClassnames } from '@sangyu-ui/utils';
	import { computed } from 'vue';
	import { SyTagProps } from './interface';

	defineOptions({
		name: 'SyTag',
		inheritAttrs: false,
	});
	const props = withDefaults(defineProps<SyTagProps>(), {
		type: 'primary',
		size: 'default',
		hit: false,
		borderRadius: 6,
	});
	defineSlots<{
		default: () => void;
	}>();
	const { c, cm } = useClassnames('tag');
	const tagCls = {
		[c()]: true,
		[c(props.size)]: true,
		[c(cm('hit-' + props.hit))]: true,
	};
	const tagStyle = computed(() => [
		props.customStyle,
		{
			color: props.color ? props.color : getColor(props.type),
			backgroundColor: props.bgColor ? props.bgColor : getColorWithAlpha(getColor(props.type), 0.2),
			borderColor: getColorWithAlpha(props.color ?? getColor(props.type), 0.2),
			borderRadius: props.borderRadius + 'px',
		},
	]);
</script>

<style scoped></style>
