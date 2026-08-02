<docs>
---
title: 可清空与状态
---

`clearable` 会在已有选中值时显示清空按钮。组件也支持禁用、加载中和选项级禁用状态。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-row">
			<sy-select v-model="clearValue" clearable :options="options" placeholder="可清空" width="220px" />
			<sy-select v-model="disabledValue" disabled :options="options" width="220px" />
			<sy-select v-model="loadingValue" loading :options="options" width="220px" />
		</div>
		<div class="current-value">可清空选择：{{ clearValue || '未选择' }}</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SySelect } from '../index';
import type { SelectOption, SelectValue } from '../Select.type';

const clearValue = ref<SelectValue>();
const disabledValue = ref<SelectValue>('draft');
const loadingValue = ref<SelectValue>('review');

const options: SelectOption[] = [
	{ label: '草稿', value: 'draft' },
	{ label: '审核中', value: 'review' },
	{ label: '已发布', value: 'published' },
	{ label: '已归档（不可选）', value: 'archived', disabled: true },
];
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
	gap: 16px;
}

.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
