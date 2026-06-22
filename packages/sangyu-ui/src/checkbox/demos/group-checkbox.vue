<docs>
---
title: 多选框组
---

使用 `SyCheckboxGroup` 统一维护已选值数组，组内每个 `SyCheckbox` 通过 `value` 声明自己的选项值。
</docs>

<template>
	<div class="demo-stack">
		<sy-checkbox-group v-model="permissions" name="permissions">
			<sy-checkbox value="read">查看</sy-checkbox>
			<sy-checkbox value="create">新建</sy-checkbox>
			<sy-checkbox value="edit">编辑</sy-checkbox>
			<sy-checkbox value="delete">删除</sy-checkbox>
		</sy-checkbox-group>
		<div class="current-value">已选权限：{{ permissions }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SyCheckbox, SyCheckboxGroup } from 'sangyu-ui';

	const permissions = ref(['read', 'edit']);
</script>

<style scoped>
	.demo-stack {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
	}

	.current-value {
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}
</style>
