<template>
	<SyTabs>
		<SyTabPane name="ready" label="可用">可用内容</SyTabPane>
		<SyTabPane name="pending" label="待开放" disabled>尚未开放</SyTabPane>
		<SyTabPane name="more" label="更多">更多内容</SyTabPane>
	</SyTabs>
</template>

<script setup lang="ts">
import { SyTabs, SyTabPane } from 'sangyu-ui';
</script>
