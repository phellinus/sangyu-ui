<docs>
---
title: SyLayout 左右侧栏与嵌套
---

侧栏的位置由子元素顺序决定，嵌套布局可以有自己的侧栏。
</docs>

<template>
	<div class="sider-demo">
		<SyLayout class="sider-demo-frame">
			<SyLayoutSider :width="120" class="sider-demo-region">左侧栏</SyLayoutSider>
			<SyLayout>
				<SyLayoutHeader class="sider-demo-region">页头</SyLayoutHeader>
				<SyLayoutContent class="sider-demo-region">内容</SyLayoutContent>
			</SyLayout>
		</SyLayout>
		<SyLayout class="sider-demo-frame">
			<SyLayoutContent class="sider-demo-region">内容</SyLayoutContent>
			<SyLayoutSider width="25%" class="sider-demo-region">右侧栏</SyLayoutSider>
		</SyLayout>
	</div>
</template>

<script setup lang="ts">
import { SyLayout, SyLayoutContent, SyLayoutHeader, SyLayoutSider } from 'sangyu-ui';
</script>

<style scoped>
.sider-demo {
	display: grid;
	gap: var(--sy-spacing-md);
}

.sider-demo-frame {
	min-height: 160px;
	border: 1px solid var(--sy-color-border);
}

.sider-demo-region {
	padding: var(--sy-spacing-md);
}
</style>
