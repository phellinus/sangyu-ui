<docs>
---
title: SySpace 自动换行
---

设置 wrap 后，子项会在容器宽度不足时换到下一行。
</docs>

<template>
	<div class="space-wrap-demo">
		<SySpace wrap size="small" class="space-wrap-demo__items">
			<SyButton v-for="item in actions" :key="item.label" :color="item.color" :type="item.type">
				{{ item.label }}
			</SyButton>
		</SySpace>
	</div>
</template>

<script setup lang="ts">
import { SyButton, SySpace } from 'sangyu-ui';

const actions = [
	{ label: '新建项目', color: 'primary', type: 'filled' },
	{ label: '打开', color: 'success', type: 'border' },
	{ label: '保存所有更改', color: 'warning', type: 'filled' },
	{ label: '导出配置', color: 'error', type: 'border' },
	{ label: '查看历史记录', color: 'primary', type: 'border' },
	{ label: '发布', color: 'success', type: 'filled' },
] as const;
</script>

<style scoped>
.space-wrap-demo {
	max-width: 460px;
	padding: 20px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-lg);
	background: var(--sy-color-surface);
	box-shadow: var(--sy-shadow-control);
}

.space-wrap-demo__items {
	width: 100%;
	row-gap: var(--sy-spacing-md);
}
</style>
