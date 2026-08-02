<docs>
---
title: 尺寸与形状
---

支持 `small`、`default`、`large` 三种尺寸，也支持通过 `shape="square"` 切换为方角样式。
</docs>

<template>
	<div class="demo-grid">
		<div class="demo-block">
			<div class="demo-title">圆角样式</div>
			<sy-switch v-model="sizes.small" size="small" checked-text="Small" unchecked-text="Small" />
			<sy-switch v-model="sizes.default" checked-text="Default" unchecked-text="Default" />
			<sy-switch v-model="sizes.large" size="large" checked-text="Large" unchecked-text="Large" />
		</div>

		<div class="demo-block">
			<div class="demo-title">方角样式</div>
			<sy-switch v-model="square.small" size="small" shape="square" checked-text="Small" unchecked-text="Small" />
			<sy-switch v-model="square.default" shape="square" checked-text="Default" unchecked-text="Default" />
			<sy-switch v-model="square.large" size="large" shape="square" checked-text="Large" unchecked-text="Large" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { SySwitch } from 'sangyu-ui';

const sizes = reactive({
	small: true,
	default: true,
	large: true,
});

const square = reactive({
	small: false,
	default: true,
	large: false,
});
</script>

<style scoped>
.demo-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 28px;
}

.demo-block {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 14px;
}

.demo-title {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
