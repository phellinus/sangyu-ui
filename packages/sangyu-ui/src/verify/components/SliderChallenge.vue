<script setup lang="ts">
import { computed, onBeforeUnmount, shallowRef, useTemplateRef } from 'vue';

import type { SliderChallengeData, VerifyAnswer } from '../Verify.type';

const props = defineProps<{
	challenge: SliderChallengeData;
	disabled?: boolean;
}>();

const emit = defineEmits<{
	submit: [answer: VerifyAnswer];
}>();

const track = useTemplateRef<HTMLElement>('track');
const offsetX = shallowRef(0);
const dragging = shallowRef(false);
const resetting = shallowRef(false);
const pointerStartX = shallowRef(0);
const offsetStartX = shallowRef(0);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const maxOffset = computed(() => Math.max(0, (track.value?.clientWidth ?? 0) - 48));

// 拖动滑块的指针事件处理
const onPointerDown = (event: PointerEvent) => {
	if (props.disabled || resetting.value) {
		return;
	}
	dragging.value = true;
	pointerStartX.value = event.clientX;
	offsetStartX.value = offsetX.value;
	(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
};

/**
 * 处理指针移动事件
 * @param event
 */
const onPointerMove = (event: PointerEvent) => {
	if (!dragging.value) {
		return;
	}
	const next = offsetStartX.value + event.clientX - pointerStartX.value;
	offsetX.value = Math.min(maxOffset.value, Math.max(0, next));
};

/**
 * 处理指针抬起事件，提交答案
 */
const onPointerUp = () => {
	if (!dragging.value) {
		return;
	}
	dragging.value = false;
	emit('submit', {
		mode: 'slider',
		challengeId: props.challenge.id,
		offsetX: offsetX.value,
	});
};

/**
 * 重置滑块位置到初始状态
 */
const reset = () => {
	if (offsetX.value === 0) {
		return;
	}
	resetting.value = true;
	offsetX.value = 0;
	clearTimeout(resetTimer);
	resetTimer = setTimeout(onResetEnd, 400);
};

/**
 * 处理重置动画结束事件，清理状态
 */
const onResetEnd = () => {
	clearTimeout(resetTimer);
	resetting.value = false;
};

onBeforeUnmount(() => clearTimeout(resetTimer));

defineExpose({ reset });
</script>

<template>
	<div class="sy-verify-slider" :class="{ 'is-resetting': resetting }">
		<div class="sy-verify-slider-image">
			<img :src="challenge.image" alt="" draggable="false" />

			<div
				class="sy-verify-slider-target"
				:style="{ left: `${challenge.targetX}px`, top: `${challenge.pieceY}px` }"
			/>

			<div
				class="sy-verify-slider-piece"
				:style="{
					left: `${offsetX}px`,
					top: `${challenge.pieceY}px`,
					backgroundImage: `url(${challenge.image})`,
					backgroundPosition: `-${challenge.targetX}px -${challenge.pieceY}px`,
				}"
			/>
		</div>

		<p class="sy-verify-hint">拖动滑块，将拼图移至缺口处</p>

		<div ref="track" class="sy-verify-slider-track">
			<span class="sy-verify-slider-track-text">向右拖动滑块</span>
			<button
				class="sy-verify-slider-handle"
				type="button"
				:disabled="disabled"
				:style="{ transform: `translateX(${offsetX}px)` }"
				@pointerdown="onPointerDown"
				@pointermove="onPointerMove"
				@pointerup="onPointerUp"
				@pointercancel="onPointerUp"
				@transitionend="onResetEnd"
			>
				→
			</button>
		</div>
	</div>
</template>
