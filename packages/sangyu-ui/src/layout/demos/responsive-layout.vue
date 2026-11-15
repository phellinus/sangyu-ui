<docs>
---
title: SyLayout 响应式与暗色主题
---

缩小视口观察侧栏堆叠，按钮可切换局部亮暗主题。
</docs>

<template>
	<div class="responsive-demo">
		<button type="button" @click="dark = !dark">切换{{ dark ? '亮色' : '暗色' }}</button>
		<ThemeProvider :mode="dark ? 'dark' : 'light'">
			<SyLayout class="responsive-demo-frame">
				<SyLayoutSider :width="180" class="responsive-demo-region">导航侧栏</SyLayoutSider>
				<SyLayoutContent class="responsive-demo-region">页面内容</SyLayoutContent>
			</SyLayout>
		</ThemeProvider>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyLayout, SyLayoutContent, SyLayoutSider, ThemeProvider } from 'sangyu-ui';

const dark = ref(false);
</script>

<style scoped>
.responsive-demo {
	display: grid;
	gap: var(--sy-spacing-md);
}

.responsive-demo-frame {
	min-height: 180px;
	border: 1px solid var(--sy-color-border);
}

.responsive-demo-region {
	padding: var(--sy-spacing-md);
}
</style>
