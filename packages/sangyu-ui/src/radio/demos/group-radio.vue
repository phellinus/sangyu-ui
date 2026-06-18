<docs>
---
title: SyRadioGroup 分组用法
---

通过 `SyRadioGroup` 统一维护选中值，多个 `SyRadio` 会共享同一个选择结果。
</docs>

<template>
	<div class="demo-stack">
		<sy-radio-group v-model="paymentMethod">
			<sy-radio label="wechat">微信支付</sy-radio>
			<sy-radio label="alipay">支付宝</sy-radio>
			<sy-radio label="card">银行卡</sy-radio>
		</sy-radio-group>

		<div class="current-value">当前值: {{ paymentMethod }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { SyRadio, SyRadioGroup } from 'sangyu-ui';
	import { ref } from 'vue';

	const paymentMethod = ref('wechat');
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
