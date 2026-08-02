<docs>
---
title: 图标输入框
---
利用 `prefix`/`suffix` 与 `fronticon`/`backicon` 插槽在输入框前后插入图标，常见于搜索、金额等需要视觉引导的场景。
</docs>

<template>
	<div>
		<div class="content">
			<SyInput ref="smRef" v-model="value1" size="small" focus-color="primary">
				<template #fronticon>
					<SyIcon name="search" />
				</template>
			</SyInput>
			<SyInput v-model="value2" placeholder="请输入内容" focus-color="success">
				<template #fronticon>
					<SyIcon name="search" />
				</template>
			</SyInput>
			<SyInput v-model="value" placeholder="请输入内容" size="large" focus-color="error">
				<template #fronticon>
					<SyIcon name="search" />
				</template>
			</SyInput>
		</div>
		<div class="content">
			<SyInput ref="smRef" v-model="value1" placeholder="请输入内容" size="small" focus-color="primary">
				<template #backicon>
					<SyIcon name="search" />
				</template>
			</SyInput>
			<SyInput v-model="value2" placeholder="请输入内容" focus-color="success">
				<template #backicon>
					<SyIcon name="search" />
				</template>
			</SyInput>
			<SyInput v-model="value" placeholder="请输入内容" size="large" focus-color="error">
				<template #backicon>
					<SyIcon name="search" />
				</template>
			</SyInput>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SyIcon } from '@sangyu-ui/icons';
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
	margin-top: 10px;
	align-items: flex-start;
	gap: 10px;
}
</style>
