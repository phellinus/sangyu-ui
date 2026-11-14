<template>
	<div class="tabs-demo-stack">
		<div v-for="alignment in alignments" :key="alignment">
			<p>{{ alignment }}</p>
			<SyTabs :alignment="alignment">
				<SyTabPane name="one" label="概览">概览内容</SyTabPane>
				<SyTabPane name="two" label="详情">详情内容</SyTabPane>
			</SyTabs>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SyTabs, SyTabPane, type TabsAlignment } from 'sangyu-ui';

const alignments: TabsAlignment[] = ['default', 'center', 'right', 'fixed'];
</script>

<style scoped>
.tabs-demo-stack {
	display: grid;
	gap: 20px;
}

.tabs-demo-stack > div {
	padding: 12px;
	border: 1px solid var(--sy-color-border);
	border-radius: 8px;
}
</style>
