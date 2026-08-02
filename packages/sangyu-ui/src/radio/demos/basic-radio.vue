<docs>
---
title: SyRadio 基础用法
---

`SyRadio` 支持独立使用，也可以直接通过 `v-model` 控制选中状态。
</docs>

<template>
	<div class="demo-stack">
		<sy-radio v-model="emailChecked">邮箱通知</sy-radio>
		<sy-radio v-model="smsChecked" shape="square">短信通知</sy-radio>
	</div>
</template>

<script lang="ts" setup>
import { SyRadio } from 'sangyu-ui';
import { ref } from 'vue';

const emailChecked = ref(true);
const smsChecked = ref(false);
</script>

<style scoped>
.demo-stack {
	display: flex;
	gap: 18px;
	flex-wrap: wrap;
}
</style>
