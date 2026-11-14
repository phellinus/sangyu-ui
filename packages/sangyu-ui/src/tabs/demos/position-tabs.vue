<template>
	<div class="tabs-demo-grid">
		<div v-for="position in positions" :key="position">
			<p>{{ position }}</p>
			<SyTabs :tab-position="position">
				<SyTabPane name="one" label="标签一">{{ position }}：面板一</SyTabPane>
				<SyTabPane name="two" label="标签二">面板二</SyTabPane>
			</SyTabs>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SyTabs, SyTabPane, type TabsPosition } from 'sangyu-ui';

const positions: TabsPosition[] = ['top', 'right', 'bottom', 'left'];
</script>

<style scoped>
.tabs-demo-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 16px;
}

.tabs-demo-grid > div {
	min-width: 0;
	padding: 12px;
	border: 1px solid var(--sy-color-border);
	border-radius: 8px;
}
</style>
