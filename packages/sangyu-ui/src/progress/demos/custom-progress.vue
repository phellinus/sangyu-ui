<docs>
---
title: SyProgress 自定义颜色、尺寸与圆角
---

可以通过 `color`、`trackColor`、`size`、`borderRadius` 快速适配不同的业务视觉风格。
</docs>

<template>
	<div class="progress-demo-stack">
		<SyProgress :percentage="54" color="error" :size="12" :border-radius="999" />
		<SyProgress :percentage="76" color="#1f8f6a" track-color="#dcefe8" :size="14" :border-radius="4" />
		<SyProgress :percentage="43" color="primary" :size="10" :show-info="false" :border-radius="0" />
	</div>
</template>

<script setup>
import { SyProgress } from 'sangyu-ui';
</script>

<style scoped>
.progress-demo-stack {
	display: grid;
	gap: 18px;
}
</style>
