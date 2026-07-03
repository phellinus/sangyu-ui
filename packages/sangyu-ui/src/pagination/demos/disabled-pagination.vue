<docs>
---
title: 禁用与加载
---

可以禁用整个分页，也可以通过 `disabled-items` 和 `loading-items` 控制指定页码。翻页时会跳过不可用页码。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-item">
			<span class="label">指定页码禁用 / 加载</span>
			<sy-pagination
				v-model:current-page="page"
				:page-count="20"
				:disabled-items="[3, 4, 9]"
				:loading-items="[6, 13]"
			/>
		</div>

		<div class="demo-item">
			<span class="label">整体禁用</span>
			<sy-pagination disabled :default-current-page="4" :page-count="12" />
		</div>

		<div class="current-value">当前页：{{ page }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SyPagination } from '../index';

	const page = ref(2);
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
		width: 150px;
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}

	.current-value {
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}
</style>
