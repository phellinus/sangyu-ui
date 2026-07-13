<docs>
---
title: 基础用法
---

通过 `v-model` 绑定当前选中值，`options` 提供选项数据。点击选择器后，从下拉列表中选择一项即可完成更新。
</docs>

<template>
	<div class="demo-stack">
		<sy-select v-model="value" :options="options" placeholder="选择一个城市" width="280px" />
		<div class="current-value">当前值：{{ value }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SySelect } from '../index';
	import type { SelectOption, SelectValue } from '../Select.type';

	const value = ref<SelectValue>('shanghai');

	const options: SelectOption[] = [
		{ label: '上海', value: 'shanghai' },
		{ label: '北京', value: 'beijing' },
		{ label: '杭州', value: 'hangzhou' },
		{ label: '深圳', value: 'shenzhen' },
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
