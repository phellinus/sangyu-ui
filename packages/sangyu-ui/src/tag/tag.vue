<template>
	<div :class="tagCls" :style="tagStyle" @click.stop="handleClick">
		<slot name="default"></slot>

		<span v-if="closable" class="sy-tag-close-icon" @click.stop="handleClose">
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</span>
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
		closable: false,
		hit: false,
		borderRadius: 6,
		clickable: false,
	});

	defineSlots<{
		default: () => void;
	}>();

	const emit = defineEmits<{
		close: [];
		click: [];
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
			cursor: props.clickable ? 'pointer' : 'default',
		},
	]);

	const handleClose = () => {
		emit('close');
	};

	const handleClick = () => {
		if (!props.clickable) return;
		emit('click');
	};
</script>

<style scoped></style>
