<docs>
---
title: SyLayout 基础布局
---

按页头、内容区和页脚的顺序组成纵向页面。
</docs>

<template>
	<SyLayout class="layout-demo">
		<SyLayoutHeader class="layout-demo-region">页头</SyLayoutHeader>
		<SyLayoutContent class="layout-demo-region">主要内容</SyLayoutContent>
		<SyLayoutFooter class="layout-demo-region">页脚</SyLayoutFooter>
	</SyLayout>
</template>

<script setup lang="ts">
import { SyLayout, SyLayoutContent, SyLayoutFooter, SyLayoutHeader } from 'sangyu-ui';
</script>

<style scoped>
.layout-demo {
	min-height: 220px;
	border: 1px solid var(--sy-color-border);
}

.layout-demo-region {
	padding: var(--sy-spacing-md);
}
</style>
