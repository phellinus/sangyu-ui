<docs>
---
title: 尺寸与形状
---

分页支持三档尺寸和多种形状。`circle` 更轻巧，`square` 适合工具型界面，`not-margin` 可以让按钮贴合展示。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-item">
			<span class="label">small</span>
			<sy-pagination v-model:current-page="smallPage" size="small" :total="90" />
		</div>

		<div class="demo-item">
			<span class="label">circle</span>
			<sy-pagination v-model:current-page="circlePage" shape="circle" color="#22c55e" :total="120" />
		</div>

		<div class="demo-item">
			<span class="label">square + notMargin</span>
			<sy-pagination v-model:current-page="squarePage" shape="square" not-margin color="#f97316" :total="120" />
		</div>

		<div class="demo-item">
			<span class="label">large</span>
			<sy-pagination v-model:current-page="largePage" size="large" color="#7c3aed" :total="150" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyPagination } from '../index';

const smallPage = ref(2);
const circlePage = ref(4);
const squarePage = ref(5);
const largePage = ref(6);
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 18px;
}

.demo-item {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12px 18px;
}

.label {
	width: 128px;
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
