<docs>
---
title: 进度条
---

开启 `progress` 后，分页下方会显示当前进度，适合多页流程或阅读进度场景。
</docs>

<template>
	<div class="demo-stack">
		<sy-pagination
			v-model:current-page="page"
			progress
			:page-count="16"
			color="#14b8a6"
			layout="prev, pager, next"
		/>
		<div class="current-value">当前进度：{{ page }} / 16</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyPagination } from '../index';

const page = ref(7);
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 18px;
	padding-bottom: 8px;
}

.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
