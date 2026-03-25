<template>
	<div :class="getAvatarCls()" :style="(props.customStyle, AvatarStyle)">
		<slot></slot>
		<slot name="text"></slot>
		<slot name="badge"></slot>
	</div>
</template>

<script setup lang="ts">
	import { useClassnames } from '@sangyu-ui/utils';
	import { AvatarProps } from './interface';

	defineOptions({
		name: 'SyAvatar',
	});
	defineSlots<{
		default: () => void;
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
	};
	const { c } = useClassnames('avatar');

	const getAvatarCls = () => ({
		[c()]: true,
		[c('circle')]: props.shape === 'circle',
		[c('square')]: props.shape === 'square',
		[c('loading')]: props.loading,
	});
</script>

<style scoped></style>
