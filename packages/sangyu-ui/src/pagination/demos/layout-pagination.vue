<docs>
---
title: 布局组合
---

通过 `layout` 控制分页结构。`->` 之后的内容会被推到右侧，适合在复杂工具栏中展示总数、每页条数和自定义内容。
</docs>

<template>
	<div class="demo-stack">
		<sy-pagination
			v-model:current-page="page"
			v-model:page-size="pageSize"
			:total="386"
			:page-sizes="[10, 20, 30, 50]"
			layout="prev, pager, next, jumper, ->, total, sizes, slot"
		>
			<template #default="{ currentPage, pageSize: size }">
				<span class="slot-text">第 {{ currentPage }} 页 / 每页 {{ size }} 条</span>
			</template>
		</sy-pagination>

		<div class="current-value">当前页：{{ page }}，每页条数：{{ pageSize }}</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyPagination } from '../index';

const page = ref(3);
const pageSize = ref(20);
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.slot-text,
.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
