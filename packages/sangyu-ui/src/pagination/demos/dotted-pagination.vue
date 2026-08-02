<docs>
---
title: 圆点模式
---

`buttons-dotted` 会隐藏页码数字，使用圆点表达分页位置，适合轮播、步骤预览等轻量导航。
</docs>

<template>
	<div class="demo-stack">
		<sy-pagination
			v-model:current-page="page"
			buttons-dotted
			:page-count="12"
			color="#0ea5e9"
			layout="prev, pager, next"
		/>
		<div class="current-value">当前页：{{ page }}</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyPagination } from '../index';

const page = ref(5);
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
