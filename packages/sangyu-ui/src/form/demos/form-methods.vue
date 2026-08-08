<docs>
---
title: Form 实例方法
---

通过组件 `ref` 可以调用表单实例方法。示例覆盖整体校验、单字段校验、重置、清除状态、字段读写、错误查询和滚动聚焦。
</docs>

<template>
	<div class="methods-demo">
		<SyForm ref="formRef" :model="model" :rules="rules" layout="vertical" validate-trigger="blur">
			<SyFormItem name="project" label="项目名称" has-feedback>
				<SyInput v-model="model.project" placeholder="请输入项目名称" />
			</SyFormItem>

			<SyFormItem name="owner" label="负责人邮箱" has-feedback>
				<SyInput v-model="model.owner" placeholder="owner@example.com" autocomplete="email" />
			</SyFormItem>

			<SyFormItem name="visibility" label="可见范围" has-feedback validate-trigger="change">
				<SySelect v-model="model.visibility" :options="visibilityOptions" placeholder="请选择可见范围" />
			</SyFormItem>
		</SyForm>

		<div class="method-actions">
			<SyButton native-type="button" @click="validateAll">validateFields</SyButton>
			<SyButton type="border" native-type="button" @click="validateOwner">validateField</SyButton>
			<SyButton type="border" native-type="button" @click="setOwner">setFieldValue</SyButton>
			<SyButton type="flat" native-type="button" @click="inspectForm">读取状态</SyButton>
			<SyButton type="flat" native-type="button" @click="clearOwnerValidate">clearValidate</SyButton>
			<SyButton type="flat" native-type="button" @click="focusOwner">scrollToField</SyButton>
			<SyButton type="line" native-type="button" @click="resetForm">resetFields</SyButton>
		</div>

		<pre class="method-output" aria-live="polite">{{ output }}</pre>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SyButton, SyForm, SyFormItem, SyInput, SySelect } from 'sangyu-ui';
import type { SelectOption, SelectValue } from '../../select/Select.type';
import type { FormInstance, FormRules, ValidateErrorInfo } from '../Form.type';

const formRef = ref<FormInstance>();
const output = ref('点击上方按钮查看实例方法执行结果');

const model = reactive({
	project: 'Sangyu UI',
	owner: '',
	visibility: undefined as SelectValue | undefined,
});

const visibilityOptions: SelectOption[] = [
	{ label: '仅自己', value: 'private' },
	{ label: '团队成员', value: 'team' },
	{ label: '所有人', value: 'public' },
];

const rules: FormRules = {
	project: { required: true, whitespace: true, message: '请输入项目名称' },
	owner: [
		{ required: true, message: '请输入负责人邮箱' },
		{ type: 'email', message: '负责人邮箱格式不正确' },
	],
	visibility: {
		required: true,
		message: '请选择可见范围',
		trigger: 'change',
	},
};

/**
 * 格式化输出内容
 * @param value 需要展示的数据
 */
function print(value: unknown): void {
	output.value = JSON.stringify(value, null, 2);
}

/**
 * 校验全部已注册字段
 */
async function validateAll(): Promise<void> {
	try {
		const values = await formRef.value?.validateFields();
		print({ method: 'validateFields', success: true, values });
	} catch (error: unknown) {
		const errorInfo = error as ValidateErrorInfo;
		print({ method: 'validateFields', success: false, errorFields: errorInfo.errorFields });
	}
}

/**
 * 单独校验负责人邮箱
 */
async function validateOwner(): Promise<void> {
	try {
		await formRef.value?.validateField('owner');
		print({ method: 'validateField', field: 'owner', success: true });
	} catch {
		print({
			method: 'validateField',
			field: 'owner',
			errors: formRef.value?.getFieldError('owner'),
		});
	}
}

/**
 * 通过实例设置负责人邮箱
 */
function setOwner(): void {
	formRef.value?.setFieldValue('owner', 'lin.qing@example.com');
	formRef.value?.clearValidate(['owner']);
	print({ method: 'setFieldValue', owner: formRef.value?.getFieldValue('owner') });
}

/**
 * 读取字段值、错误和交互状态
 */
function inspectForm(): void {
	print({
		method: 'getFieldValue / getFieldsError / isFieldsTouched',
		owner: formRef.value?.getFieldValue('owner'),
		fieldErrors: formRef.value?.getFieldsError(),
		touched: formRef.value?.isFieldsTouched(),
	});
}

/**
 * 清除负责人字段的校验状态
 */
function clearOwnerValidate(): void {
	formRef.value?.clearValidate(['owner']);
	print({ method: 'clearValidate', field: 'owner' });
}

/**
 * 滚动并聚焦负责人字段
 */
function focusOwner(): void {
	formRef.value?.scrollToField('owner', {
		behavior: 'smooth',
		block: 'center',
	});
	print({ method: 'scrollToField', field: 'owner' });
}

/**
 * 重置全部字段
 */
function resetForm(): void {
	formRef.value?.resetFields();
	print({ method: 'resetFields', values: model });
}
</script>

<style scoped>
.methods-demo {
	width: min(100%, 620px);
}

.method-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.method-output {
	box-sizing: border-box;
	min-height: 96px;
	margin: 16px 0 0;
	padding: 14px;
	overflow: auto;
	border-radius: 8px;
	background: #f6f8fa;
	color: #334155;
	font-size: 12px;
	line-height: 1.6;
	white-space: pre-wrap;
}
</style>
