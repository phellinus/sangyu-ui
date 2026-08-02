<docs>
---
title: SyTag的基础用法
---
</docs>

<template>
	<div style="display: flex; flex-wrap: wrap; gap: 20px">
		<SyTag v-for="(item, index) in typeArray" :key="index" :type="item">{{ item }}</SyTag>
		<SyTag color="#8c6d4b" bg-color="#fdf8f3" hit>自定义颜色</SyTag>
	</div>
</template>

<script lang="ts" setup>
import { SyTag } from 'sangyu-ui';

const typeArray = ['primary', 'success', 'warning', 'error'];
</script>
