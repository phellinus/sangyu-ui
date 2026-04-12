<docs>
---
title: SyDivider 垂直分割与样式变体
---

垂直分割线适合按钮组、工具栏和行内数据的轻量区隔，也可以配合不同线型增强风格变化。
</docs>

<template>
	<div class="divider-inline-row">
		<span>预览</span>
		<SyDivider direction="vertical" height="20px" />
		<span>编辑</span>
		<SyDivider direction="vertical" height="20px" variant="dashed" color="success" />
		<span>发布</span>
		<SyDivider direction="vertical" height="20px" variant="dotted" color="#ef7c42" />
		<span>归档</span>
	</div>
</template>

<script setup>
	import { SyDivider } from 'sangyu-ui';
</script>

<style scoped>
	.divider-inline-row {
		display: inline-flex;
		align-items: center;
		padding: 12px 16px;
		border-radius: 12px;
		background: linear-gradient(180deg, #fbfcfd 0%, #f5f7f9 100%);
		color: #4f5862;
	}
</style>
