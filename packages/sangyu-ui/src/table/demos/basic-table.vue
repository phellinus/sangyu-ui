<docs>
---
title: 基本表格	
---

这个是表格的基本用法
</docs>

<template>
	<SyTable
		:columns="columns"
		:data-source="dataSource"
		:scroll="{ x: 1400, y: 350 }"
		row-key="id"
		bordered
		@row-click="handleRowClick"
	>
		<template #bodyCell="{ column, text, record }">
			<!-- 只接管操作列，其他列继续显示原始值 -->
			<template v-if="column.key === 'action'">
				<SyButton @click.stop="handleEdit(record)">编辑</SyButton>
			</template>

			<template v-else>
				{{ text }}
			</template>
		</template>

		<template #empty>暂无符合条件的数据</template>
	</SyTable>
</template>

<script setup lang="ts">
	import type { TableColumn } from 'sangyu-ui';
	import { SyButton, SyTable } from 'sangyu-ui';

	interface UserRow {
		id: number;
		date: string;
		name: string;
		state: string;
		city: string;
		address: string;
	}

	const columns: TableColumn<UserRow>[] = [
		{
			title: 'Date',
			key: 'date',
			dataIndex: 'date',
			width: 240,
			fixed: 'left',
		},
		{
			title: 'Name',
			key: 'name',
			dataIndex: 'name',
			width: 240,
		},
		{
			title: 'State',
			key: 'state',
			dataIndex: 'state',
			width: 220,
		},
		{
			title: 'City',
			key: 'city',
			dataIndex: 'city',
			width: 220,
		},
		{
			title: 'Address',
			key: 'address',
			dataIndex: 'address',
			width: 360,
			ellipsis: true,
		},
		{
			title: '操作',
			key: 'action',
			width: 120,
			align: 'center',
			fixed: 'right',
		},
	];

	const dataSource: UserRow[] = Array.from({ length: 30 }).map((_, index) => ({
		id: index + 1,
		date: `2016-05-${index + 1}`,
		name: `Tom ${index + 1}`,
		state: 'California',
		city: 'Los Angeles',
		address: `No. ${index + 1} Lake Park`,
	}));

	// 处理表格行点击
	const handleRowClick = (record: UserRow) => {
		console.log(record);
	};

	// 处理编辑操作
	const handleEdit = (record: UserRow) => {
		console.log(record);
	};
</script>
