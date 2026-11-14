<template>
	<SyTabs activation="manual" lazy>
		<SyTabPane name="first" label="第一项">首次激活时挂载，之后保持挂载。</SyTabPane>
		<SyTabPane name="second" label="第二项">用方向键移动焦点，再按 Enter 或 Space 激活。</SyTabPane>
	</SyTabs>
</template>

<script setup lang="ts">
import { SyTabs, SyTabPane } from 'sangyu-ui';
</script>
