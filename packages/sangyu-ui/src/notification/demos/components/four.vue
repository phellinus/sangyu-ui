<template>
	<div style="color: red">{{ state.count }} 秒后关闭</div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, reactive, onMounted } from 'vue';

const state = reactive({
	count: 4,
});

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
	timer = setInterval(() => {
		if (state.count > 0) {
			state.count--;
		} else {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		}
	}, 1000);
});

onBeforeUnmount(() => {
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
});
</script>

<style scoped></style>
