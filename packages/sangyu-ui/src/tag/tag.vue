<template>
	<div>
		<slot name="default"></slot>
	</div>
</template>

<script setup lang="ts">
	defineOptions({
		name: 'SyTag',
		inheritAttrs: false,
	});
	defineSlots<{
		default: () => void;
	}>();
</script>

<style scoped></style>
