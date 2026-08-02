<docs>
---
title: SyProgress 基础线形进度
---

适合放在列表项、上传区域、任务执行区中，直观表达当前完成比例。
</docs>

<template>
	<div class="progress-demo-stack">
		<SyProgress :percentage="28" />
		<SyProgress :percentage="64" color="success" />
		<SyProgress :percentage="100" color="warning" />
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
