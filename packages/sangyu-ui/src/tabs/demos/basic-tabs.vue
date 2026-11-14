<template>
	<SyTabs default-value="overview">
		<SyTabPane name="overview" label="概览">概览内容</SyTabPane>
		<SyTabPane name="activity" label="动态">最近的动态</SyTabPane>
		<SyTabPane name="settings" label="设置">设置内容</SyTabPane>
	</SyTabs>
</template>

<script setup lang="ts">
import { SyTabs, SyTabPane } from 'sangyu-ui';
</script>
