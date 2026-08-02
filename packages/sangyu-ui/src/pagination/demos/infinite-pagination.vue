<docs>
---
title: 无限翻页
---

`infinite` 会让上一页和下一页在首尾之间循环，第一页点击上一页会跳到最后一页。
</docs>

<template>
	<div class="demo-stack">
		<sy-pagination
			v-model:current-page="page"
			infinite
			:page-count="10"
			prev-text="上一页"
			next-text="下一页"
			color="#ec4899"
			layout="prev, pager, next"
		/>
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
