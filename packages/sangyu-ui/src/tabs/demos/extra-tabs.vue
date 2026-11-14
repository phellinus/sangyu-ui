<template>
	<SyTabs>
		<SyTabPane name="inbox" title="收件箱" :icon="'✉'">收件箱内容</SyTabPane>
		<SyTabPane name="starred" label="收藏" :icon="'★'" icon-position="right">
			<template #title><strong>我的收藏</strong></template>
			收藏内容
		</SyTabPane>
		<template #extra><button type="button">更多操作</button></template>
	</SyTabs>
</template>

<script setup lang="ts">
import { SyTabs, SyTabPane } from 'sangyu-ui';
</script>
