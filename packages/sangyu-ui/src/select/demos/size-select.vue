<docs>
---
title: 选择器尺寸
---

中号省略 `size`，小号和大号分别传入 `small` 和 `large`。
</docs>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { SySelect } from '../index';
import type { SelectOption, SelectValue } from '../Select.type';

const smallValue = shallowRef<SelectValue>();
const defaultValue = shallowRef<SelectValue>();
const largeValue = shallowRef<SelectValue>();

const options: SelectOption[] = [
	{ label: '上海', value: 'shanghai' },
	{ label: '北京', value: 'beijing' },
	{ label: '杭州', value: 'hangzhou' },
];
</script>

<template>
	<div class="demo-row">
		<SySelect v-model="smallValue" size="small" :options="options" placeholder="小号" />
		<SySelect v-model="defaultValue" :options="options" placeholder="中号" />
		<SySelect v-model="largeValue" size="large" :options="options" placeholder="大号" />
	</div>
</template>

<style scoped>
.demo-row {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 16px;
}
</style>
