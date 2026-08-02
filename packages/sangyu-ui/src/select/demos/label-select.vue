<docs>
---
title: 标签模式
---

设置 `mode="label"` 后，输入内容并按 Enter 可以创建标签。标签模式会自动启用多选和搜索，也可以通过下拉面板选择预设标签。
</docs>

<template>
	<div class="demo-stack">
		<sy-select
			v-model="labels"
			mode="label"
			clearable
			:options="options"
			:max="5"
			placeholder="输入标签后按 Enter"
			width="380px"
		/>
		<div class="current-value">当前标签：{{ labels.length ? labels.join('、') : '暂无标签' }}</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SySelect } from '../index';
import type { SelectOption, SelectValue } from '../Select.type';

const labels = ref<SelectValue[]>(['Vue', 'TypeScript']);

const options: SelectOption[] = [
	{ label: 'Vue', value: 'Vue' },
	{ label: 'React', value: 'React' },
	{ label: 'TypeScript', value: 'TypeScript' },
	{ label: 'Vite', value: 'Vite' },
	{ label: 'Vitest', value: 'Vitest' },
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
