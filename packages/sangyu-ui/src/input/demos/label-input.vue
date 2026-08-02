<docs>
---
title: 浮动 Label 输入框
---
仅配置 `label` 即可获得浮动提示词，配合不同尺寸与类型演示标签上浮效果，适合需要明确字段语义的场景。
</docs>

<template>
	<div class="content">
		<SyInput ref="smRef" v-model="value1" label="请输入内容" size="small"></SyInput>
		<SyInput v-model="value2" label="请输入内容" type="border" bg-color="white"></SyInput>
		<SyInput v-model="value" label="请输入内容" size="large"></SyInput>
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
