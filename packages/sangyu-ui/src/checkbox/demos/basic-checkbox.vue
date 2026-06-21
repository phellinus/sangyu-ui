<docs>
---
title: sy-checkbox 的基础用法
---

</docs>

<template>
	<div>
		<sy-checkbox v-model="checked" label="复选框 A"></sy-checkbox>
		<sy-checkbox v-model="checked" label="复选框 B"></sy-checkbox>
		<sy-checkbox v-model="checked" label="复选框 C"></sy-checkbox>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { SyCheckbox } from 'sangyu-ui';
	const checked = ref(true);
</script>
