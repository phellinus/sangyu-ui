<docs>
---
title: SyTag的基础用法
---
</docs>

<template>
	<div style="display: flex; flex-wrap: wrap; gap: 10px">
		<SyTag v-for="(item, index) in typeArray" :key="index" :type="item">{{ item }}</SyTag>
	</div>
</template>

<script lang="ts" setup>
	import { SyTag } from 'sangyu-ui';

	const typeArray = ['primary', 'success', 'warning', 'error'];
</script>
