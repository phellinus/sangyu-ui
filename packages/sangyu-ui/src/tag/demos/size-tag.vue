<docs>
---
title: SyTag的尺寸用法
---
SyTag组件提供了三种尺寸，可以通过`size`属性来设置。default为默认尺寸，small为小尺寸，large为更大尺寸。
</docs>

<template>
	<div style="display: flex; align-items: center; gap: 20px">
		<SyTag v-for="(item, index) in sizeTag" :key="index" :type="item.type" :size="item.size">{{ item.size }}</SyTag>
	</div>
</template>

<script lang="ts" setup>
import { SyTag } from 'sangyu-ui';

const sizeTag = [
	{
		size: 'small' as any,
		type: 'primary',
	},
	{
		size: 'default' as any,
		type: 'success',
	},
	{
		size: 'large' as any,
		type: 'warning',
	},
];
</script>
