<docs>
---
title: SyRadio 的基础用法
---


</docs>

<template>
	<div>
		<sy-radio v-model="value" label="1">Option 1</sy-radio>
		<sy-radio v-model="value2" label="1" shape="square">Option 2</sy-radio>
	</div>
</template>

<script lang="ts" setup>
	import { SyRadio } from 'sangyu-ui';
	import { ref } from 'vue';

	const value = ref(false);
	const value2 = ref(true);
</script>
