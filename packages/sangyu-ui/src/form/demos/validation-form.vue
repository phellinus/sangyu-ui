<docs>
---
title: 常用校验规则
---

规则支持必填、类型、长度、正则表达式和触发方式。设置 `warningOnly` 后，字段会显示警告，但不会阻止表单提交。
</docs>

<template>
	<div class="validation-demo">
		<SyForm
			ref="formRef"
			:model="model"
			:rules="rules"
			layout="vertical"
			validate-trigger="blur"
			@finish="handleFinish"
			@finish-failed="handleFinishFailed"
		>
			<SyFormItem name="nickname" label="昵称" has-feedback extra="长度为 2 至 16 个字符">
				<SyInput v-model="model.nickname" placeholder="请输入昵称" />
			</SyFormItem>

			<SyFormItem name="email" label="邮箱" has-feedback>
				<SyInput v-model="model.email" placeholder="name@example.com" autocomplete="email" />
			</SyFormItem>

			<SyFormItem name="phone" label="手机号" has-feedback validate-trigger="change">
				<SyInput v-model="model.phone" placeholder="请输入 11 位手机号" />
			</SyFormItem>

			<SyFormItem name="intro" label="个人介绍" has-feedback extra="少于 12 个字符时只显示建议">
				<SyInput v-model="model.intro" placeholder="简单介绍你的工作方向" />
			</SyFormItem>

			<SyFormItem :show-label="false">
				<div class="form-actions">
					<SyButton native-type="submit">提交校验</SyButton>
					<SyButton type="border" native-type="button" @click="handleReset">重置</SyButton>
				</div>
			</SyFormItem>
		</SyForm>

		<p v-if="resultMessage" :class="['demo-result', `demo-result--${resultStatus}`]" role="status">
			{{ resultMessage }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SyButton, SyForm, SyFormItem, SyInput } from 'sangyu-ui';
import type { FormInstance, FormRules, ValidateErrorInfo } from '../Form.type';

const formRef = ref<FormInstance>();
const resultStatus = ref<'success' | 'error'>('success');
const resultMessage = ref('');

const model = reactive({
	nickname: '',
	email: '',
	phone: '',
	intro: '前端开发',
});

const rules: FormRules = {
	nickname: [
		{ required: true, whitespace: true, message: '请输入昵称' },
		{ min: 2, max: 16, message: '昵称长度应为 2 至 16 个字符' },
	],
	email: [
		{ required: true, message: '请输入邮箱' },
		{ type: 'email', message: '请输入有效的邮箱地址' },
	],
	phone: [
		{ required: true, message: '请输入手机号', trigger: 'change' },
		{ pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'change' },
	],
	intro: {
		min: 12,
		message: '建议补充更完整的个人介绍',
		warningOnly: true,
	},
};

/**
 * 处理校验成功事件
 */
function handleFinish(): void {
	resultStatus.value = 'success';
	resultMessage.value = '校验通过，warningOnly 警告不会阻止提交';
}

/**
 * 处理校验失败事件
 * @param errorInfo 表单校验错误信息
 */
function handleFinishFailed(errorInfo: ValidateErrorInfo): void {
	resultStatus.value = 'error';
	resultMessage.value = `仍有 ${errorInfo.errorFields.length} 个字段需要修改`;
}

/**
 * 重置表单字段和提示信息
 */
function handleReset(): void {
	formRef.value?.resetFields();
	resultMessage.value = '';
}
</script>

<style scoped>
.validation-demo {
	width: min(100%, 480px);
}

.form-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.demo-result {
	margin: 4px 0 0;
	padding: 10px 12px;
	border-radius: 8px;
	font-size: 13px;
}

.demo-result--success {
	color: var(--sy-color-success-7);
	background: var(--sy-color-success-1);
}

.demo-result--error {
	color: var(--sy-color-error-7);
	background: var(--sy-color-error-1);
}
</style>
