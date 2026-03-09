<docs>
---
title: 固定表头	
---

固定表头的table
</docs>

<template>
	<div class="demo-fixed-table">
		<SyTable :columns="columns" :data="data" :height="350" />
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { SyTable } from 'sangyu-ui';
	const columns = [
		{ title: 'Date', key: 'date', width: 240, fixed: true },
		{ title: 'Name', key: 'name', width: 240 },
		{ title: 'State', key: 'state', width: 220 },
		{ title: 'City', key: 'city', width: 200 },
		{ title: 'Address', key: 'address', width: 320 },
		{ title: 'Zip', key: 'zip', width: 120 },
	];

	const cityPool = ['Los Angeles', 'Sacramento', 'San Diego'];
	const statePool = ['California', 'Nevada', 'Arizona'];
	const data = ref(
		Array.from({ length: 30 }).map((_, index) => ({
			date: `2016-05-${(index % 30) + 1}`,
			name: `Tom ${index + 1}`,
			state: statePool[index % statePool.length],
			city: cityPool[index % cityPool.length],
			address: `No. ${index + 1} Lake Park, Mountain View`,
			zip: `90${10 + (index % 20)}`,
		})),
	);
</script>

<style lang="less" scoped>
	.demo-fixed-table {
		padding: 12px;
		background-color: #fff;
		border-radius: 12px;
		box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
	}
</style>
