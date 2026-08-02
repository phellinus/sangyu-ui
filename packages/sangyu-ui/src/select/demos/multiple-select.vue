<docs>
---
title: 多选
---

设置 `multiple` 后，`v-model` 使用数组绑定。可通过 `max` 限制最多可选数量，通过 `max-tag-count` 控制已选标签展示数量。
</docs>

<template>
	<div class="demo-stack">
		<sy-select
			v-model="value"
			multiple
			clearable
			:options="options"
			:max="4"
			:max-tag-count="3"
			placeholder="选择成员"
			width="360px"
		/>
		<div class="current-value">当前值：{{ value }}</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SySelect } from '../index';
import type { SelectOption, SelectValue } from '../Select.type';

const value = ref<SelectValue[]>(['design', 'frontend']);

const options: SelectOption[] = [
	{ label: '设计', value: 'design' },
	{ label: '前端', value: 'frontend' },
	{ label: '后端', value: 'backend' },
	{ label: '测试', value: 'qa' },
	{ label: '产品', value: 'product' },
	{ label: '运维', value: 'ops' },
];
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
