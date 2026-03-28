<template>
	<div class="sy-avatar-wrapper" :style="wraperStyle">
		<div :class="getAvatarCls()" :style="(props.customStyle, AvatarStyle)">
			<sy-icon v-if="props.icon" :name="props.icon" :size="props.iconsize" />
			<template v-if="!props.icon">
				<img v-if="props.src" :src="props.src" />
				<template v-if="textSlotFirstChar">
					{{ textSlotFirstChar }}
				</template>
				<slot v-else name="text"></slot>
			</template>
		</div>
		<div v-if="props.badge" :class="badgeCls()"></div>
		<div v-if="$slots.badge" :class="badgeCls(true)">
			<slot name="badge"></slot>
		</div>
		<svg
			v-if="props.loading"
			width="1em"
			height="1em"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			stroke-width="4"
		>
			<path
				d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
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
		badge: false,
		badgePosition: 'bottom-right',
		badgeColor: 'primary',
		badgeOffsetX: 0,
		badgeOffsetY: 0,
		loading: false,
	});
	const wraperStyle = {
		'--sy-badge-color': getColor(props.badgeColor),
		'--sy-badge-offset-x': `${props.badgeOffsetX}px`,
		'--sy-badge-offset-y': `${props.badgeOffsetY}px`,
		'--sy-avatar-color': getColor(props.color),
		'--sy-avatar-bgcolor': getColor(props.bgcolor),
		'--sy-avatar-font-size': `${Math.max(12, Math.round(props.size * 0.4))}px`,
	};
	const AvatarStyle = {
		width: `${props.size}px`,
		height: `${props.size}px`,
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
	const badgeCls = (isText = false) => ({
		[c('badge')]: props.badge,
		[c('badge-text')]: isText,
		[c(`badge-${props.badgePosition}`)]: true,
	});
</script>

<style scoped></style>
