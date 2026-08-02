<docs>
---
title: 三种尺寸
---

通过 `size` 设置复选框尺寸，可选 `small`、`default` 和 `large`。
</docs>

<template>
	<div class="demo-stack">
		<div v-for="item in sizes" :key="item.value" class="demo-row">
			<span class="demo-title">{{ item.label }}</span>
			<sy-checkbox v-model="checked[item.value]" :size="item.value">接收系统通知</sy-checkbox>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { SyCheckbox, type CheckboxSize } from 'sangyu-ui';

const sizes: Array<{ label: string; value: CheckboxSize }> = [
	{ label: 'Small', value: 'small' },
	{ label: 'Default', value: 'default' },
	{ label: 'Large', value: 'large' },
];

const checked = reactive<Record<CheckboxSize, boolean>>({
	small: true,
	default: true,
	large: true,
});
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 18px;
}

.demo-row {
	display: flex;
	align-items: center;
	gap: 20px;
}

.demo-title {
	width: 64px;
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
