<docs>
---
title: 固定列与表体滚动
---

纵向滚动只发生在表体，表头保持可见，首列和末列可以固定
</docs>

<template>
	<div class="demo-fixed-table">
		<SyTable :columns="columns" :data-source="data" :scroll="{ x: 1400, y: 350 }" row-key="id" bordered>
			<template #bodyCell="{ column, text, record }">
				<SyButton v-if="column.key === 'action'" @click="handleView(record)">查看</SyButton>
				<span v-else>{{ text }}</span>
			</template>
		</SyTable>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { TableColumn } from 'sangyu-ui';
	import { SyButton, SyTable } from 'sangyu-ui';

	interface UserRow {
		id: number;
		date: string;
		name: string;
		state: string;
		city: string;
		address: string;
		zip: string;
	}

	const columns: TableColumn<UserRow>[] = [
		{ title: '日期', key: 'date', dataIndex: 'date', width: 160, fixed: 'left' },
		{ title: '姓名', key: 'name', dataIndex: 'name', width: 180 },
		{ title: '州', key: 'state', dataIndex: 'state', width: 180 },
		{ title: '城市', key: 'city', dataIndex: 'city', width: 180 },
		{ title: '地址', key: 'address', dataIndex: 'address', width: 360, ellipsis: true },
		{ title: '邮编', key: 'zip', dataIndex: 'zip', width: 140 },
		{ title: '操作', key: 'action', width: 120, fixed: 'right', align: 'center' },
	];

	const cityPool = ['Los Angeles', 'Sacramento', 'San Diego'];
	const statePool = ['California', 'Nevada', 'Arizona'];
	const data = ref<UserRow[]>(
		Array.from({ length: 30 }).map((_, index) => ({
			id: index + 1,
			date: `2016-05-${(index % 30) + 1}`,
			name: `Tom ${index + 1}`,
			state: statePool[index % statePool.length],
			city: cityPool[index % cityPool.length],
			address: `No. ${index + 1} Lake Park, Mountain View`,
			zip: `90${10 + (index % 20)}`,
		})),
	);

	// 处理查看操作
	const handleView = (record: UserRow) => {
		console.log(record);
	};
</script>

<style lang="less" scoped>
	.demo-fixed-table {
		padding: 12px;
		background-color: #fff;
		border-radius: 12px;
		box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
	}
</style>
