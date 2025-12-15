<docs>
---
title: 禁用输入框
---
展示 `disabled` 输入框在不同类型与尺寸下的统一样式，便于在不可编辑状态时保持视觉一致并提示用户当前字段不可修改。
</docs>

<template>
	<div>
		<div class="content">
			<SyInput ref="smRef" v-model="value1" type="border" size="small" focus-color="primary" disabled></SyInput>
			<SyInput v-model="value2" placeholder="请输入内容" focus-color="success" disabled>
				<template #fronticon>
					<SyIcon name="search" />
				</template>
			</SyInput>
			<SyInput
				v-model="value"
				type="bottom-line"
				placeholder="请输入内容"
				size="large"
				focus-color="error"
				disabled
			>
				<template #fronticon>
					<SyIcon name="search" />
				</template>
			</SyInput>
		</div>
		<div class="content">
			<SyInput ref="smRef" v-model="value1" placeholder="请输入内容" size="small" focus-color="primary" disabled>
				<template #backicon>
					<SyIcon name="search" />
				</template>
			</SyInput>
			<SyInput v-model="value2" placeholder="请输入内容" focus-color="success" disabled>
				<template #backicon>
					<SyIcon name="search" />
				</template>
			</SyInput>
			<SyInput v-model="value" placeholder="请输入内容" size="large" focus-color="error" disabled>
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
	import SyInput from '../input.vue';
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
