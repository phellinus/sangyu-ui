<template>
	<div class="tabs-demo-stack">
		<SyTabs color="#7952b3">
			<SyTabPane name="local" label="实例颜色">紫色激活态</SyTabPane>
			<SyTabPane name="other" label="另一项">另一面板</SyTabPane>
		</SyTabs>
		<ThemeProvider :tokens="{ components: { tabs: { activeColor: '#d4380d', indicatorColor: '#d4380d' } } }">
			<SyTabs>
				<SyTabPane name="theme" label="主题范围">由 ThemeProvider 提供颜色</SyTabPane>
				<SyTabPane name="next" label="下一项">下一面板</SyTabPane>
			</SyTabs>
		</ThemeProvider>
	</div>
</template>

<script setup lang="ts">
import { SyTabs, SyTabPane, ThemeProvider } from 'sangyu-ui';
</script>

<style scoped>
.tabs-demo-stack {
	display: grid;
	gap: 16px;
}
</style>
