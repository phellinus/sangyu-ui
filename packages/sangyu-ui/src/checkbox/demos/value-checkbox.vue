<docs>
---
title: 自定义值与数组绑定
---

单独使用时，可通过 `true-value` 和 `false-value` 自定义提交值。多个复选框也可以直接绑定同一个数组，此时使用 `value` 标识每个选项。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-block">
			<div class="demo-title">自定义真假值</div>
			<sy-checkbox v-model="status" true-value="enabled" false-value="disabled">启用自动同步</sy-checkbox>
			<span class="current-value">{{ status }}</span>
		</div>

		<div class="demo-block">
			<div class="demo-title">直接绑定数组</div>
			<div class="demo-row">
				<sy-checkbox v-model="channels" value="email">邮件</sy-checkbox>
				<sy-checkbox v-model="channels" value="sms">短信</sy-checkbox>
				<sy-checkbox v-model="channels" value="push">站内推送</sy-checkbox>
			</div>
			<span class="current-value">{{ channels }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyCheckbox } from 'sangyu-ui';

const status = ref('enabled');
const channels = ref(['email', 'push']);
</script>

<style scoped>
.demo-stack,
.demo-block {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.demo-stack {
	gap: 24px;
}

.demo-block {
	gap: 12px;
}

.demo-row {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.demo-title,
.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
