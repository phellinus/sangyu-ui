<template>
	<div class="tabs-demo-stack">
		<div class="tabs-demo-actions">
			<button type="button" @click="current = 'overview'">显示概览</button>
			<button type="button" @click="current = 'activity'">显示动态</button>
			<span>当前：{{ current }}</span>
		</div>
		<SyTabs v-model="current" @change="onChange">
			<SyTabPane name="overview" label="概览">概览内容</SyTabPane>
			<SyTabPane name="activity" label="动态">动态内容</SyTabPane>
		</SyTabs>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyTabs, SyTabPane } from 'sangyu-ui';

const current = ref('overview');
const onChange = (name: string | number) => console.info('active tab:', name);
</script>

<style scoped>
.tabs-demo-stack {
	display: grid;
	gap: 16px;
}

.tabs-demo-actions {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
}
</style>
