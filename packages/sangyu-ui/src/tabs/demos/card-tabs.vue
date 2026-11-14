<template>
	<SyTabs type="card" default-value="files">
		<SyTabPane name="files" label="文件">文件列表</SyTabPane>
		<SyTabPane name="history" label="历史">操作历史</SyTabPane>
	</SyTabs>
</template>

<script setup lang="ts">
import { SyTabs, SyTabPane } from 'sangyu-ui';
</script>
