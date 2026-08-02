<docs>
---
title: 标签与外观
---

支持前置标签、选中删除线及自定义主题色。默认插槽的优先级高于 `content` 和 `label` 属性。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-row">
			<sy-checkbox v-model="before" label-position="before">标签在左侧</sy-checkbox>
			<sy-checkbox v-model="taskDone" line-through>完成后添加删除线</sy-checkbox>
		</div>
		<div class="demo-row">
			<sy-checkbox v-model="colors.cyan" color="#0891b2">湖蓝色</sy-checkbox>
			<sy-checkbox v-model="colors.green" color="#16a34a">松绿色</sy-checkbox>
			<sy-checkbox v-model="colors.rose" color="#e11d48">玫红色</sy-checkbox>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SyCheckbox } from 'sangyu-ui';

const before = ref(false);
const taskDone = ref(true);
const colors = reactive({
	cyan: true,
	green: true,
	rose: true,
});
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 22px;
}

.demo-row {
	display: flex;
	flex-wrap: wrap;
	gap: 20px 28px;
}
</style>
