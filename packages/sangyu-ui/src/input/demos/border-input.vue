<docs>
---
title: Border 输入框
---
通过 `type="border"` 展示描边型输入框，支持不同尺寸、label 与自定义边框/聚焦颜色，适合作为卡片或表单分栏中的输入场景。
</docs>

<template>
	<div class="content">
		<SyInput
			ref="smRef"
			v-model="value1"
			label="请输入内容"
			size="small"
			type="border"
			bg-color="white"
			focus-color="primary"
			label-color="primary"
		></SyInput>
		<SyInput
			v-model="value2"
			type="border"
			placeholder="请输入内容"
			border-color="warning"
			focus-color="error"
		></SyInput>
		<SyInput
			v-model="value"
			type="border"
			label="请输入内容"
			size="large"
			bg-color="white"
			focus-color="success"
		></SyInput>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { SyInput } from 'sangyu-ui';
	const value = ref('');
	const value1 = ref('');
	const value2 = ref('');
	const smRef = ref();
	onMounted(() => {
		//smRef.value.focus();
	});
</script>
<style scoped>
	.content {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}
</style>
