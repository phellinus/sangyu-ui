<docs>
---
title: SyTag点击事件
---
SyTag组件提供点击事件，可以通过`@handleClick`来监听点击事件。
</docs>

<template>
	<div style="display: flex; align-items: center; gap: 20px">
		<SyTag
			v-for="(item, index) in state.sizeTags"
			:key="index"
			:type="item.type"
			clickable
			@click="handleClick(item)"
		>
			{{ item.size }}
		</SyTag>
	</div>
</template>

<script lang="ts" setup>
import { SyTag } from 'sangyu-ui';
import { reactive } from 'vue';

const state = reactive({
	sizeTags: [
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
	],
});
// 关闭标签的回调函数
const handleClick = (item: any) => {
	console.log(item);
};
</script>
