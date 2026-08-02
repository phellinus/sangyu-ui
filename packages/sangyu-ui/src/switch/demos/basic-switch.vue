<docs>
---
title: 基础用法
---

使用 `v-model` 绑定开关状态，适合消息提醒、自动保存等立即生效的配置项。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-row">
			<sy-switch v-model="settings.notify" checked-text="消息提醒已开启" unchecked-text="消息提醒已关闭" />
			<sy-switch v-model="settings.autoSave" checked-text="自动保存中" unchecked-text="自动保存关闭" />
		</div>
		<div class="current-value">当前状态：{{ settings }}</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { SySwitch } from 'sangyu-ui';

const settings = reactive({
	notify: true,
	autoSave: false,
});
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.demo-row {
	display: flex;
	flex-wrap: wrap;
	gap: 20px 24px;
}

.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
