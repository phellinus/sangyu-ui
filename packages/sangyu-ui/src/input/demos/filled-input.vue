<docs>
---
title: Filled 输入框
---
默认的填充样式，拥有柔和背景与圆角，适合大多数表单场景；示例展示不同尺寸与 label 组合。
</docs>

<template>
	value: {{ value }}
	<div class="content">
		<SyInput ref="smRef" v-model="value" placeholder="请输入内容" size="small"></SyInput>
		<SyInput v-model="value" label="请输入内容"></SyInput>
		<SyInput v-model="value" placeholder="请输入内容" size="large"></SyInput>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyInput } from 'sangyu-ui';
const value = ref('');
const smRef = ref();
</script>
<style scoped>
.content {
	display: flex;
	align-items: flex-start;
	gap: 10px;
}
</style>
