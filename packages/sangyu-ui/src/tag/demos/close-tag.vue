<docs>
---
title: SyTag的删除用法
---
SyTag组件提供关闭标签的功能，通过设置closable属性，可以显示关闭图标，通过设置onClose属性，可以设置关闭标签的回调函数。
</docs>

<template>
	<div style="display: flex; align-items: center; gap: 20px">
		<SyTag
			v-for="(item, index) in state.sizeTags"
			:key="index"
			:type="item.type"
			:size="item.size"
			closable
			@onClose="handleClose(item)"
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
	const handleClose = (item: any) => {
		state.sizeTags = state.sizeTags.filter((i) => i.size !== item.size);
	};
</script>
