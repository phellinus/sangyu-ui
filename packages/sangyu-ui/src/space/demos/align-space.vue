<docs>
---
title: SySpace 对齐方式
---

align 控制子项在交叉轴上的对齐方式。
</docs>

<template>
	<div class="space-align-demo">
		<div v-for="align in alignments" :key="align" class="space-align-demo__row">
			<span class="space-align-demo__label">{{ align }}</span>
			<SySpace :align="align" size="small" class="space-align-demo__items">
				<SyButton color="primary">操作</SyButton>
				<span class="space-align-demo__text">常规文字</span>
				<span class="space-align-demo__large">大字号</span>
				<SyButton color="success" type="border">次要操作</SyButton>
			</SySpace>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SyButton, SySpace } from 'sangyu-ui';

const alignments = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
</script>

<style scoped>
.space-align-demo {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.space-align-demo__row {
	display: grid;
	grid-template-columns: 92px minmax(0, 1fr);
	align-items: center;
	gap: 12px;
	padding: 8px 12px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-md);
	background: var(--sy-color-surface);
}

.space-align-demo__label {
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-sm);
	font-weight: 600;
}

.space-align-demo__items {
	min-height: 56px;
	padding: 0 8px;
}

.space-align-demo__text {
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-md);
}

.space-align-demo__large {
	color: var(--sy-color-primary);
	font-size: 24px;
	font-weight: 600;
}
</style>
