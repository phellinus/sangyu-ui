<docs>
---
title: SySpace 间距尺寸
---

支持 small、medium、large 预设、数字像素值，以及分别设置横向和纵向间距的元组。
</docs>

<template>
	<div class="space-sizes-demo">
		<div class="space-sizes-demo__row">
			<span>small</span>
			<SySpace size="small">
				<SyButton color="primary">保存</SyButton>
				<SyButton color="success" type="border">取消</SyButton>
			</SySpace>
		</div>
		<div class="space-sizes-demo__row">
			<span>medium</span>
			<SySpace size="medium">
				<SyButton color="primary">保存</SyButton>
				<SyButton color="success" type="border">取消</SyButton>
			</SySpace>
		</div>
		<div class="space-sizes-demo__row">
			<span>large</span>
			<SySpace size="large">
				<SyButton color="primary">保存</SyButton>
				<SyButton color="success" type="border">取消</SyButton>
			</SySpace>
		</div>
		<div class="space-sizes-demo__row">
			<span>number</span>
			<SySpace :size="12">
				<SyButton color="primary">保存</SyButton>
				<SyButton color="success" type="border">取消</SyButton>
			</SySpace>
		</div>
		<div class="space-sizes-demo__row">
			<span>tuple</span>
			<SySpace :size="[24, 8]">
				<SyButton color="primary">保存</SyButton>
				<SyButton color="success" type="border">取消</SyButton>
			</SySpace>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SyButton, SySpace } from 'sangyu-ui';
</script>

<style scoped>
.space-sizes-demo {
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 16px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-md);
	background: var(--sy-color-surface);
}

.space-sizes-demo__row {
	display: flex;
	align-items: center;
	gap: 20px;
	min-height: 52px;
	border-bottom: 1px solid var(--sy-color-border);
}

.space-sizes-demo__row:last-child {
	border-bottom: 0;
}

.space-sizes-demo__row > span {
	width: 72px;
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-sm);
	font-weight: 600;
}
</style>
