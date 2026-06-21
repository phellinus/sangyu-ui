<docs>
---
title: 基础用法
---

使用 `v-model` 双向绑定选中状态。选中时，背景会由中心缩放展开，并带有一次轻量的边框扩散动画。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-row">
			<sy-checkbox v-model="agreements.service">服务协议</sy-checkbox>
			<sy-checkbox v-model="agreements.privacy">隐私政策</sy-checkbox>
			<sy-checkbox v-model="agreements.news">产品动态</sy-checkbox>
		</div>
		<div class="current-value">当前状态：{{ agreements }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { reactive } from 'vue';
	import { SyCheckbox } from 'sangyu-ui';

	const agreements = reactive({
		service: true,
		privacy: false,
		news: false,
	});
</script>

<style scoped>
	.demo-stack {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.demo-row {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}

	.current-value {
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}
</style>
