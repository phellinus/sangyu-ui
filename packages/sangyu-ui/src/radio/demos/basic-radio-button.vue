<docs>
---
title: SyRadio 的基础用法
---

通过设置 `size` 可以设置不同尺寸的 `SyRadio`，通过设置 `shape` 可以设置不同形状的 `SyRadio`
</docs>

<template>
	<div>
		<div class="radio-inline">
			<sy-radio-button v-model="value" size="small" label="1">Option 1</sy-radio-button>
			<sy-radio-button v-model="value" label="1">Option 1</sy-radio-button>
			<sy-radio-button v-model="value" size="large" label="1">Option 1</sy-radio-button>
		</div>
		<div class="radio-inline">
			<sy-radio-button v-model="value2" label="1" size="small" shape="square">Option 4</sy-radio-button>
			<sy-radio-button v-model="value2" label="1" shape="square">Option 5</sy-radio-button>
			<sy-radio-button v-model="value2" label="1" size="large" shape="square">Option 6</sy-radio-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { SyRadioButton } from 'sangyu-ui';
	import { ref } from 'vue';

	const value = ref(false);
	const value2 = ref(false);
</script>

<style scoped>
	.radio-inline {
		margin: 10px;
		display: flex;
		gap: 16px;
	}
</style>
