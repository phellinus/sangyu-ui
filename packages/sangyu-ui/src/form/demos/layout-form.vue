<docs>
---
title: 表单布局
---

Form 支持 `horizontal`、`vertical` 和 `inline` 三种布局。水平布局适合信息录入，垂直布局适合窄容器，行内布局适合搜索条件。
</docs>

<template>
	<div class="layout-demo">
		<div class="demo-toolbar" aria-label="表单布局选择">
			<span class="toolbar-label">布局方式</span>
			<SyRadioGroup v-model="layout">
				<SyRadioButton label="horizontal">水平</SyRadioButton>
				<SyRadioButton label="vertical">垂直</SyRadioButton>
				<SyRadioButton label="inline">行内</SyRadioButton>
			</SyRadioGroup>
		</div>

		<SyForm
			:model="model"
			:layout="layout"
			:label-width="layout === 'horizontal' ? 88 : undefined"
			:class="['layout-form', `layout-form--${layout}`]"
		>
			<SyFormItem name="keyword" label="关键词">
				<SyInput v-model="model.keyword" placeholder="输入项目名称" />
			</SyFormItem>

			<SyFormItem name="status" label="状态">
				<SySelect v-model="model.status" :options="statusOptions" placeholder="选择状态" />
			</SyFormItem>

			<SyFormItem :show-label="false">
				<SyButton native-type="button" @click="handleSearch">查询</SyButton>
			</SyFormItem>
		</SyForm>

		<p class="demo-result" role="status">{{ resultMessage }}</p>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SyButton, SyForm, SyFormItem, SyInput, SyRadioButton, SyRadioGroup, SySelect } from 'sangyu-ui';
import type { SelectOption, SelectValue } from '../../select/Select.type';
import type { FormLayout } from '../Form.type';

const layout = ref<FormLayout>('horizontal');
const resultMessage = ref('调整布局后，字段模型保持不变');

const model = reactive({
	keyword: '',
	status: undefined as SelectValue | undefined,
});

const statusOptions: SelectOption[] = [
	{ label: '进行中', value: 'active' },
	{ label: '已完成', value: 'completed' },
	{ label: '已归档', value: 'archived' },
];

/**
 * 展示当前搜索条件
 */
function handleSearch(): void {
	const status = statusOptions.find((item) => item.value === model.status)?.label ?? '全部状态';
	const keyword = model.keyword.trim() || '全部项目';

	resultMessage.value = `当前条件：${keyword}，${status}`;
}
</script>

<style scoped>
.layout-demo {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.demo-toolbar {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12px;
}

.toolbar-label {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}

.layout-form {
	max-width: 560px;
}

.layout-form:not(.layout-form--inline) :deep(.sy-input),
.layout-form:not(.layout-form--inline) :deep(.sy-select) {
	width: 100%;
}

.layout-form--inline :deep(.sy-input) {
	width: 180px;
}

.layout-form--inline :deep(.sy-select) {
	width: 160px;
}

.demo-result {
	margin: 0;
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}

@media (max-width: 640px) {
	.layout-form--inline {
		display: block;
	}

	.layout-form--inline :deep(.sy-form-item) {
		display: block;
		margin-bottom: 16px;
	}

	.layout-form--inline :deep(.sy-input),
	.layout-form--inline :deep(.sy-select) {
		width: 100%;
	}
}
</style>
