<docs>
---
title: 异步校验
---

自定义 `validator` 可以返回 Promise。示例模拟服务端检查用户名是否可用，连续触发校验时只有最后一次结果会更新字段状态。
</docs>

<template>
	<div class="async-demo">
		<SyForm
			ref="formRef"
			:model="model"
			:rules="rules"
			layout="vertical"
			validate-trigger="blur"
			@finish="handleFinish"
			@finish-failed="handleFinishFailed"
		>
			<SyFormItem name="username" label="用户名" has-feedback extra="已占用示例：admin、root、sangyu">
				<SyInput v-model="model.username" placeholder="输入后失焦进行检查" autocomplete="username" />
			</SyFormItem>

			<SyFormItem :show-label="false">
				<div class="form-actions">
					<SyButton native-type="submit">检查并提交</SyButton>
					<SyButton type="border" native-type="button" @click="fillAvailableName">填入可用名称</SyButton>
					<SyButton type="flat" native-type="button" @click="fillReservedName">填入已占用名称</SyButton>
				</div>
			</SyFormItem>
		</SyForm>

		<p class="request-note">每次检查会模拟 650ms 网络请求</p>
		<p v-if="resultMessage" :class="['demo-result', `demo-result--${resultStatus}`]" role="status">
			{{ resultMessage }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SyButton, SyForm, SyFormItem, SyInput } from 'sangyu-ui';
import type { FormInstance, FormRules, ValidateErrorInfo } from '../Form.type';

const reservedNames = new Set(['admin', 'root', 'sangyu']);
const formRef = ref<FormInstance>();
const resultStatus = ref<'success' | 'error'>('success');
const resultMessage = ref('');

const model = reactive({
	username: '',
});

/**
 * 模拟服务端用户名检查
 * @param value 当前用户名
 * @returns 校验结果
 */
async function checkUsername(value: unknown): Promise<undefined | string> {
	const username = String(value ?? '')
		.trim()
		.toLowerCase();

	if (!username) return undefined;

	await new Promise<void>((resolve) => {
		setTimeout(resolve, 650);
	});

	if (reservedNames.has(username)) {
		return '该用户名已被占用';
	}

	return undefined;
}

const rules: FormRules = {
	username: [
		{ required: true, whitespace: true, message: '请输入用户名' },
		{ min: 3, message: '用户名至少需要 3 个字符' },
		{
			validator: (_rule, value) => checkUsername(value),
		},
	],
};

/**
 * 填入可用用户名并清除旧状态
 */
function fillAvailableName(): void {
	model.username = 'river-team';
	formRef.value?.clearValidate(['username']);
	resultMessage.value = '';
}

/**
 * 填入已占用用户名并清除旧状态
 */
function fillReservedName(): void {
	model.username = 'admin';
	formRef.value?.clearValidate(['username']);
	resultMessage.value = '';
}

/**
 * 处理异步校验成功事件
 */
function handleFinish(): void {
	resultStatus.value = 'success';
	resultMessage.value = '用户名可用，表单提交成功';
}

/**
 * 处理异步校验失败事件
 * @param errorInfo 表单校验错误信息
 */
function handleFinishFailed(errorInfo: ValidateErrorInfo): void {
	resultStatus.value = 'error';
	resultMessage.value = errorInfo.errorFields[0]?.errors[0] ?? '用户名检查失败';
}
</script>

<style scoped>
.async-demo {
	width: min(100%, 520px);
}

.form-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.request-note,
.demo-result {
	margin: 4px 0 0;
	font-size: 13px;
	line-height: 1.6;
}

.request-note {
	color: var(--sy-color-text-secondary);
}

.demo-result--success {
	color: var(--sy-color-success-7);
}

.demo-result--error {
	color: var(--sy-color-error-7);
}
</style>
