<docs>
---
title: SySpace 分隔与换行
---

分隔插槽优先于 `split` 属性；元组尺寸分别控制水平和垂直间距。
</docs>

<template>
	<SySpace :size="['small', 16]" wrap split="/">
		<span>首页</span>
		<span>产品</span>
		<span>详情</span>
		<template #split><span aria-hidden="true">·</span></template>
	</SySpace>
</template>

<script setup lang="ts">
import { SySpace } from 'sangyu-ui';
</script>
