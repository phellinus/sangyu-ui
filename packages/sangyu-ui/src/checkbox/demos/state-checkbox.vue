<docs>
---
title: 状态展示
---

支持半选、禁用和加载状态。`indeterminate` 仅控制视觉状态，业务值仍由 `v-model` 管理；加载状态会暂时阻止交互。
</docs>

<template>
	<div class="demo-grid">
		<div class="demo-block">
			<div class="demo-title">常规状态</div>
			<sy-checkbox v-model="normal">未选中</sy-checkbox>
			<sy-checkbox v-model="checked">已选中</sy-checkbox>
			<sy-checkbox v-model="partial" indeterminate>部分选中</sy-checkbox>
		</div>

		<div class="demo-block">
			<div class="demo-title">不可交互</div>
			<sy-checkbox :model-value="false" disabled>禁用</sy-checkbox>
			<sy-checkbox :model-value="true" disabled>选中且禁用</sy-checkbox>
			<sy-checkbox :model-value="true" loading>正在保存</sy-checkbox>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SyCheckbox } from 'sangyu-ui';

	const normal = ref(false);
	const checked = ref(true);
	const partial = ref(false);
</script>

<style scoped>
	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 28px;
	}

	.demo-block {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 14px;
	}

	.demo-title {
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}
</style>
