<docs>
---
title: SyProgress 圆形进度
---

更适合概览卡片和重点指标，让单一进度值在视觉上更聚焦。
</docs>

<template>
	<div class="progress-circle-row">
		<SyProgress type="circle" :percentage="36" />
		<SyProgress type="circle" :percentage="72" color="success" :size="100" />
		<SyProgress type="circle" :percentage="88" color="#ff7a59" :size="132" />
	</div>
</template>

<script setup>
import { SyProgress } from 'sangyu-ui';
</script>

<style scoped>
.progress-circle-row {
	display: flex;
	flex-wrap: wrap;
	gap: 24px;
	align-items: center;
}
</style>
