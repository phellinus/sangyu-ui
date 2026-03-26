<template>
	<div :class="getAvatarCls()" :style="(props.customStyle, AvatarStyle)">
		<sy-icon v-if="props.icon" :name="props.icon" :size="props.iconsize" />
		<template v-if="!props.icon">
			<img v-if="props.src" :src="props.src" />
			<template v-if="textSlotFirstChar">
				{{ textSlotFirstChar }}
			</template>
			<slot v-else name="text"></slot>
			<slot name="badge"></slot>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { computed, useSlots } from 'vue';
	import { getColor, useClassnames } from '@sangyu-ui/utils';
	import { AvatarProps } from './interface';
	import { SyIcon } from '@sangyu-ui/icons';

	defineOptions({
		name: 'SyAvatar',
	});
	defineSlots<{
		text: () => void;
		badge: () => void;
	}>();
	const props = withDefaults(defineProps<AvatarProps>(), {
		shape: 'square',
		customStyle: '',
		size: 40,
	});
	const AvatarStyle = {
		width: `${props.size}px`,
		height: `${props.size}px`,
		'--sy-avatar-color': getColor(props.color),
		'--sy-avatar-bgcolor': getColor(props.bgcolor),
		'--sy-avatar-font-size': `${Math.max(12, Math.round(props.size * 0.4))}px`,
	};
	const { c } = useClassnames('avatar');
	const slots = useSlots();
	const textSlotFirstChar = computed(() => {
		const textSlot = slots.text?.();
		if (!textSlot || !textSlot.length) return '';
		const textContent = textSlot
			.map((node) => {
				if (typeof node.children === 'string') {
					return node.children;
				}
				if (Array.isArray(node.children)) {
					return node.children.map((child) => (typeof child === 'string' ? child : '')).join('');
				}
				return '';
			})
			.join('')
			.trim();
		return textContent ? textContent[0] : '';
	});

	const getAvatarCls = () => ({
		[c()]: true,
		[c('circle')]: props.shape === 'circle',
		[c('square')]: props.shape === 'square',
		[c('loading')]: props.loading,
	});
</script>

<style scoped></style>
