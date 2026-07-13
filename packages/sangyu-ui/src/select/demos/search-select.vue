<docs>
---
title: 搜索
---

设置 `filterable` 后可以输入关键词筛选选项。默认按 `label` 进行不区分大小写的本地匹配，也可以传入 `filter-method` 自定义过滤逻辑。
</docs>

<template>
	<div class="demo-stack">
		<sy-select
			v-model="value"
			filterable
			clearable
			:options="options"
			:filter-method="filterByCodeOrLabel"
			placeholder="搜索名称或编码"
			width="300px"
		/>
		<div class="current-value">当前值：{{ value || '未选择' }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SySelect } from '../index';
	import type { SelectOption, SelectValue } from '../Select.type';

	const value = ref<SelectValue>();

	const options: SelectOption[] = [
		{ label: '设计系统', value: 'design-system', code: 'DS' },
		{ label: '组件库', value: 'components', code: 'UI' },
		{ label: '文档站', value: 'docs', code: 'DOC' },
		{ label: '工程工具', value: 'tooling', code: 'CLI' },
		{ label: '自动化测试', value: 'testing', code: 'TEST' },
	];

	/**
	 * 根据选项 label 或自定义 code 字段进行搜索。
	 * @param query 用户输入的关键词
	 * @param option 当前被判断的选项
	 */
	const filterByCodeOrLabel = (query: string, option: SelectOption) => {
		const keyword = query.toLowerCase();
		return option.label.toLowerCase().includes(keyword) || String(option.code).toLowerCase().includes(keyword);
	};
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
