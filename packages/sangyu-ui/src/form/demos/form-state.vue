<docs>
---
title: 禁用状态与尺寸继承
---

Form 的 `disabled` 和 `size` 会传递给内部输入控件。子控件显式设置 `size` 时，其自身配置优先于 Form。
</docs>

<template>
	<div class="state-demo">
		<div class="state-toolbar">
			<div class="toolbar-field">
				<span>表单尺寸</span>
				<SyRadioGroup v-model="size">
					<SyRadioButton label="small">Small</SyRadioButton>
					<SyRadioButton label="default">Default</SyRadioButton>
					<SyRadioButton label="large">Large</SyRadioButton>
				</SyRadioGroup>
			</div>

			<div class="toolbar-field">
				<span>禁用表单</span>
				<SySwitch v-model="disabled" />
			</div>
		</div>

		<SyForm :model="model" :size="size" :disabled="disabled" layout="vertical" class="state-form">
			<SyFormItem name="name" label="项目名称" extra="该输入框继承 Form 的尺寸">
				<SyInput v-model="model.name" placeholder="请输入项目名称" />
			</SyFormItem>

			<SyFormItem name="fixedSize" label="固定尺寸" extra="该输入框始终使用 small">
				<SyInput v-model="model.fixedSize" size="small" placeholder="子控件配置优先" />
			</SyFormItem>

			<SyFormItem name="category" label="项目类型">
				<SySelect v-model="model.category" :options="categoryOptions" placeholder="请选择项目类型" />
			</SyFormItem>

			<SyFormItem name="channels" label="通知渠道">
				<div class="choice-row">
					<SyCheckbox v-model="model.emailNotice">邮件</SyCheckbox>
					<SyCheckbox v-model="model.browserNotice">浏览器</SyCheckbox>
				</div>
			</SyFormItem>

			<SyFormItem name="visibility" label="可见范围">
				<SyRadioGroup v-model="model.visibility">
					<SyRadio label="private">仅自己</SyRadio>
					<SyRadio label="team">团队</SyRadio>
				</SyRadioGroup>
			</SyFormItem>

			<SyFormItem name="enabled" label="启用项目">
				<SySwitch v-model="model.enabled" checked-text="已启用" unchecked-text="未启用" />
			</SyFormItem>
		</SyForm>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {
	SyCheckbox,
	SyForm,
	SyFormItem,
	SyInput,
	SyRadio,
	SyRadioButton,
	SyRadioGroup,
	SySelect,
	SySwitch,
} from 'sangyu-ui';
import type { SelectOption, SelectValue } from '../../select/Select.type';
import type { FormSize } from '../Form.type';

const size = ref<FormSize>('default');
const disabled = ref(false);

const model = reactive({
	name: '组件文档',
	fixedSize: '固定 small',
	category: 'docs' as SelectValue,
	emailNotice: true,
	browserNotice: false,
	visibility: 'team',
	enabled: true,
});

const categoryOptions: SelectOption[] = [
	{ label: '组件文档', value: 'docs' },
	{ label: '业务系统', value: 'business' },
	{ label: '移动应用', value: 'mobile' },
];
</script>

<style scoped>
.state-demo {
	display: flex;
	flex-direction: column;
	gap: 22px;
	width: min(100%, 620px);
}

.state-toolbar {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 18px 28px;
	padding-bottom: 18px;
	border-bottom: 1px solid var(--sy-color-border);
}

.toolbar-field,
.choice-row {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12px;
}

.toolbar-field > span {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}

@media (max-width: 640px) {
	.state-toolbar,
	.toolbar-field {
		align-items: flex-start;
		flex-direction: column;
	}
}
</style>
