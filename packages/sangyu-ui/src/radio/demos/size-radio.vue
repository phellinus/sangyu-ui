<docs>
---
title: 尺寸与形状
---

基础单选支持 `small`、`default`、`large` 三种尺寸，并提供 `circle` / `square` 两种形态。
</docs>

<template>
	<div class="demo-grid">
		<div class="demo-block">
			<div class="demo-title">Circle</div>
			<div class="demo-row">
				<sy-radio v-model="circleSmall" size="small">Small</sy-radio>
				<sy-radio v-model="circleDefault">Default</sy-radio>
				<sy-radio v-model="circleLarge" size="large">Large</sy-radio>
			</div>
		</div>

		<div class="demo-block">
			<div class="demo-title">Square</div>
			<div class="demo-row">
				<sy-radio v-model="squareSmall" shape="square" size="small">Small</sy-radio>
				<sy-radio v-model="squareDefault" shape="square">Default</sy-radio>
				<sy-radio v-model="squareLarge" shape="square" size="large">Large</sy-radio>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SyRadio } from 'sangyu-ui';
import { ref } from 'vue';

const circleSmall = ref(false);
const circleDefault = ref(true);
const circleLarge = ref(false);
const squareSmall = ref(false);
const squareDefault = ref(true);
const squareLarge = ref(false);
</script>

<style scoped>
.demo-grid {
	display: flex;
	flex-direction: column;
	gap: 18px;
}

.demo-block {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.demo-title {
	font-size: 14px;
	color: var(--sy-color-text-secondary);
}

.demo-row {
	display: flex;
	flex-wrap: wrap;
	gap: 18px;
}
</style>
