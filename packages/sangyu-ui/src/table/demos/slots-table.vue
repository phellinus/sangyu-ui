<docs>
---
title: 基本表格	
---

这个是表格的基本用法
</docs>

<template>
	<div>
		<SyTable :columns="columns" :data="data" />
		<SyTable :data="data">
			<sy-table-column key="name" title="Name" :width="200" align="left" />
			<sy-table-column key="age" title="Age" :width="200" align="center" />
			<sy-table-column key="address" title="Address" :width="300" align="right" />
			<sy-table-column key="action" :width="200" align="center">
				<template v-slot="{ row }">
					<SyButton @click="handleEdit(row)">编辑</SyButton>
				</template>
			</sy-table-column>
		</SyTable>
	</div>
</template>

<script setup>
	import { ref, h } from 'vue';
	import { SyTable, SyButton } from 'sangyu-ui';

	const columns = [
		{
			title: 'Name',
			key: 'name',
		},
		{
			title: 'Age',
			key: 'age',
		},
		{
			title: 'Address',
			key: 'address',
		},
		{
			title: 'Action',
			key: 'action',
			width: 200,
			align: 'center',
			slots: {
				default: ({ row }) => {
					return h(
						SyButton,
						{
							onClick: () => {
								console.log(row);
							},
						},
						'Edit',
					);
				},
			},
		},
	];
	const data = ref(
		Array.from({ length: 10 }).map((_, i) => {
			return {
				name: `EdwardKing${i}`,
				age: 18 + i,
				address: `London, Park Lane no. ${i}`,
			};
		}),
	);
	//编辑按钮
	const handleEdit = (row) => {
		console.log(row);
	};
</script>

<style lang="scss" scoped></style>
