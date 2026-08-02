<docs>
---
title: 大数据
---

`virtual` 默认开启，适合选项数量较多的场景。组件只渲染可视区域附近的选项，从而减少 DOM 数量。
</docs>

<template>
	<div class="demo-stack">
		<sy-select
			v-model="value"
			filterable
			clearable
			:options="options"
			:list-height="260"
			:item-height="32"
			:overscan="8"
			placeholder="搜索或选择 10000 条数据"
			width="340px"
		/>
		<div class="current-value">当前值：{{ value || '未选择' }}</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { SySelect } from '../index';
import type { SelectValue } from '../Select.type';

const value = ref<SelectValue>();

const options = computed(() =>
	Array.from({ length: 10000 }, (_, index) => {
		const value = index + 1;
		return {
			label: `选项 ${value}`,
			value,
		};
	}),
);
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
