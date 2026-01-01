<docs>
---
title: 基本表格	
---

这个是表格的基本用法
</docs>

<template>
	<div>
		<SyTable :columns="columns" :data="data" />
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
