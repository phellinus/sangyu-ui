<docs>
---
title: 插槽与自定义渲染
---

支持表头插槽和表体单元格插槽
</docs>

<template>
	<div>
		<SyTable :columns="columns" :data-source="data" row-key="id">
			<template #headerCell="{ column }">
				<strong v-if="column.key === 'name'">{{ column.title }}（用户）</strong>
				<template v-else>{{ column.title }}</template>
			</template>

			<template #bodyCell="{ column, text, record }">
				<SyButton v-if="column.key === 'action'" @click="handleEdit(record)">编辑</SyButton>
				<span v-else-if="column.key === 'age'">{{ text }} 岁</span>
				<span v-else>{{ text }}</span>
			</template>
		</SyTable>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TableColumn } from 'sangyu-ui';
import { SyTable, SyButton } from 'sangyu-ui';

interface UserRow {
	id: number;
	name: string;
	age: number;
	address: string;
}

const columns: TableColumn<UserRow>[] = [
	{
		title: '姓名',
		key: 'name',
		dataIndex: 'name',
		width: 180,
	},
	{
		title: '年龄',
		key: 'age',
		dataIndex: 'age',
		width: 120,
		align: 'center',
	},
	{
		title: '地址',
		key: 'address',
		dataIndex: 'address',
		width: 300,
		ellipsis: true,
	},
	{
		title: '操作',
		key: 'action',
		width: 120,
		align: 'center',
	},
];
const data = ref<UserRow[]>(
	Array.from({ length: 10 }).map((_, i) => {
		return {
			id: i + 1,
			name: `EdwardKing${i}`,
			age: 18 + i,
			address: `London, Park Lane no. ${i}`,
		};
	}),
);
// 处理编辑按钮
const handleEdit = (row: UserRow) => {
	console.log(row);
};
</script>
