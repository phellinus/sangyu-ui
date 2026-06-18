<docs>
---
title: SyRadioButton 按钮风格
---

`SyRadioButton` 更适合和 `SyRadioGroup` 组合使用，常见于筛选和模式切换。
</docs>

<template>
	<div class="demo-stack">
		<sy-radio-group v-model="deliveryType">
			<sy-radio-button label="standard">标准配送</sy-radio-button>
			<sy-radio-button label="express">加急配送</sy-radio-button>
			<sy-radio-button label="pickup">门店自提</sy-radio-button>
		</sy-radio-group>

		<div class="current-value">当前值: {{ deliveryType }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { SyRadioButton, SyRadioGroup } from 'sangyu-ui';
	import { ref } from 'vue';

	const deliveryType = ref('express');
</script>

<style scoped>
	.demo-stack {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.current-value {
		color: var(--sy-color-text-secondary);
		font-size: 14px;
	}
</style>
