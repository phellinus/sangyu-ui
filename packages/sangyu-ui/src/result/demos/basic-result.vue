<docs>
---
title: SyResult 基础状态
---

适合操作完成后的反馈页，用统一的情绪表达告诉用户当前状态。
</docs>

<template>
	<div class="result-demo-stack">
		<SyResult status="success" title="提交成功" sub-title="资料已进入审核流程，通常会在 1 个工作日内完成。" />
		<SyResult status="info" title="正在处理中" sub-title="系统已接收请求，正在生成资源，请稍候查看结果。" />
	</div>
</template>

<script setup>
import { SyResult } from 'sangyu-ui';
</script>

<style scoped>
.result-demo-stack {
	display: grid;
	gap: 24px;
}
</style>
