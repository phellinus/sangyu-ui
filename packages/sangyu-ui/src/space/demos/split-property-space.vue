<docs>
---
title: SySpace split 属性
---

split 属性支持字符串和数字，并且只会插入有效子项之间。
</docs>

<template>
	<div class="space-split-property-demo">
		<div class="space-split-property-demo__card">
			<p class="space-split-property-demo__caption">字符串分隔符</p>
			<SySpace split="/">
				<span class="space-split-property-demo__crumb">首页</span>
				<span class="space-split-property-demo__crumb">产品</span>
				<span class="space-split-property-demo__crumb">详情</span>
			</SySpace>
		</div>
		<div class="space-split-property-demo__card">
			<p class="space-split-property-demo__caption">数字分隔符</p>
			<SySpace :split="0" class="space-split-property-demo__numbers">
				<span>1</span>
				<span>2</span>
				<span>3</span>
			</SySpace>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SySpace } from 'sangyu-ui';
</script>

<style scoped>
.space-split-property-demo {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.space-split-property-demo__card {
	display: flex;
	flex-direction: column;
	gap: 12px;
	min-width: 220px;
	padding: 16px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-md);
	background: var(--sy-color-surface);
}

.space-split-property-demo__caption {
	margin: 0;
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-sm);
	font-weight: 600;
}

.space-split-property-demo__crumb {
	padding: 4px 8px;
	border-radius: var(--sy-radius-sm);
	background: color-mix(in srgb, var(--sy-color-primary) 10%, transparent);
	color: var(--sy-color-primary);
}

.space-split-property-demo__numbers {
	color: var(--sy-color-success);
	font-weight: 600;
}
</style>
