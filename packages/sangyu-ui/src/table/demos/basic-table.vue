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
			<SyButton>12</SyButton>
		</SyTable>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

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
</script>

<style lang="scss" scoped></style>
