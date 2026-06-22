<docs>
---
title: 排列与尺寸
---

Group 可通过 `direction` 控制横向或纵向排列，并使用 `size` 统一设置所有子项的尺寸。
</docs>

<template>
	<div class="demo-grid">
		<div class="demo-block">
			<div class="demo-title">横向 · Small</div>
			<sy-checkbox-group v-model="compactFilters" size="small">
				<sy-checkbox value="online">在线</sy-checkbox>
				<sy-checkbox value="verified">已认证</sy-checkbox>
				<sy-checkbox value="featured">推荐</sy-checkbox>
			</sy-checkbox-group>
		</div>

		<div class="demo-block">
			<div class="demo-title">纵向 · Large</div>
			<sy-checkbox-group v-model="deliveryMethods" direction="vertical" size="large">
				<sy-checkbox value="standard">标准配送</sy-checkbox>
				<sy-checkbox value="express">次日达</sy-checkbox>
				<sy-checkbox value="pickup">到店自提</sy-checkbox>
			</sy-checkbox-group>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SyCheckbox, SyCheckboxGroup } from 'sangyu-ui';

	const compactFilters = ref(['online', 'verified']);
	const deliveryMethods = ref(['standard']);
</script>

<style scoped>
	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
