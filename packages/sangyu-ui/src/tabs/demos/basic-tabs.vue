<template>
	<SyTabs v-model="current" :lazy="true">
		<SyTabPane name="overview" label="概览">概览内容</SyTabPane>
		<SyTabPane name="details" label="详情">详情内容</SyTabPane>
		<SyTabPane name="disabled" label="禁用" disabled>不可访问</SyTabPane>
	</SyTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyTabs, SyTabPane } from 'sangyu-ui';

const current = ref('overview');
</script>
