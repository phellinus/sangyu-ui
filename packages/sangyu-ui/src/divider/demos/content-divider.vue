<docs>
---
title: SyDivider 带文案的分割线
---

通过 `content` 或默认插槽插入提示信息，适合“OR”“更多内容”“高级选项”等分组语义。
</docs>

<template>
	<div class="divider-demo-stack">
		<SyDivider content="OR" />
		<SyDivider align="left" variant="dashed">更多内容</SyDivider>
		<SyDivider align="right" color="#8a5cf6">高级设置</SyDivider>
	</div>
</template>

<script setup>
	import { SyDivider } from 'sangyu-ui';
</script>

<style scoped>
	.divider-demo-stack {
		display: grid;
		gap: 18px;
	}
</style>
