<docs>
---
title: 自定义内容
---

通过 `option`、`label`、`prefix` 和 `tag` 插槽可以定制选项、回显内容和多选标签展示。
</docs>

<template>
	<div class="demo-stack">
		<sy-select v-model="singleValue" :options="options" placeholder="选择环境" width="320px">
			<template #prefix>
				<span class="prefix-dot" />
			</template>
			<template #label="{ option }">
				<span v-if="option" class="selected-label">
					<span class="color-dot" :style="{ backgroundColor: option.color }" />
					{{ option.label }}
				</span>
			</template>
			<template #option="{ option, selected }">
				<div class="option-content">
					<span class="color-dot" :style="{ backgroundColor: option.color }" />
					<span>{{ option.label }}</span>
					<span class="option-desc">{{ option.desc }}</span>
				</div>
				<span v-if="selected" class="selected-mark">已选</span>
			</template>
		</sy-select>

		<sy-select v-model="multiValue" multiple :options="options" placeholder="多选环境" width="360px">
			<template #tag="{ option, remove }">
				<span class="custom-tag">
					<span class="color-dot" :style="{ backgroundColor: option.color }" />
					{{ option.label }}
					<button class="tag-close" type="button" @click.stop="remove">×</button>
				</span>
			</template>
		</sy-select>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SySelect } from '../index';
import type { SelectOption, SelectValue } from '../Select.type';

const singleValue = ref<SelectValue>('prod');
const multiValue = ref<SelectValue[]>(['dev', 'test']);

const options: SelectOption[] = [
	{ label: '开发环境', value: 'dev', color: '#22c55e', desc: '本地联调' },
	{ label: '测试环境', value: 'test', color: '#3b82f6', desc: '功能验收' },
	{ label: '预发环境', value: 'stage', color: '#f59e0b', desc: '上线前验证' },
	{ label: '生产环境', value: 'prod', color: '#ef4444', desc: '正式服务' },
];
</script>

<style scoped>
.demo-stack {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.prefix-dot,
.color-dot {
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 50%;
}

.prefix-dot {
	margin-right: 8px;
	background: var(--sy-color-primary);
}

.selected-label,
.option-content,
.custom-tag {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.option-content {
	min-width: 0;
}

.option-desc {
	color: var(--sy-color-text-secondary);
	font-size: 12px;
}

.selected-mark {
	margin-left: auto;
	color: var(--sy-color-primary);
	font-size: 12px;
}

.custom-tag {
	height: 22px;
	padding: 0 6px;
	border-radius: 4px;
	background: #eef2f7;
	font-size: 12px;
}

.tag-close {
	border: 0;
	background: transparent;
	cursor: pointer;
	line-height: 1;
}
</style>
