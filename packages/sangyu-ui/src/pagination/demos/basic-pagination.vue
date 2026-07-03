<docs>
---
title: 基础用法
---

使用 `v-model:current-page` 绑定当前页。切换页码时，当前页高亮块会平滑滑动到目标位置。
</docs>

<template>
	<div class="demo-stack">
		<sy-pagination v-model:current-page="page" :total="120" />
		<div class="current-value">当前页：{{ page }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SyPagination } from '../index';

	const page = ref(1);
</script>

<style scoped>
	.demo-stack {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.current-value {
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}
</style>
