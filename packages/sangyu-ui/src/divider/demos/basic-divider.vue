<docs>
---
title: SyDivider 基础分割线
---

默认分割线适合切分表单区块、卡片内容和信息模块，保持页面节奏清晰但不过分跳脱。
</docs>

<template>
	<div class="divider-demo-stack">
		<div>基础信息</div>
		<SyDivider />
		<div>更多设置</div>
		<SyDivider thickness="medium" color="primary" />
		<div>提交配置</div>
	</div>
</template>

<script setup>
import { SyDivider } from 'sangyu-ui';
</script>

<style scoped>
.divider-demo-stack {
	display: grid;
	gap: 10px;
	color: #4f5862;
}
</style>
