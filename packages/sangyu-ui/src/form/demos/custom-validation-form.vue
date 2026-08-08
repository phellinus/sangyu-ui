<docs>
---
title: 自定义与跨字段校验
---

自定义校验函数可以读取完整的表单模型，适合确认密码、时间范围等字段联动场景。校验函数可以返回字符串、Error 或 Promise。
</docs>

<template>
	<div class="custom-validation-demo">
		<SyForm
			ref="formRef"
			:model="model"
			:rules="rules"
			layout="vertical"
			validate-trigger="blur"
			@finish="handleFinish"
			@finish-failed="handleFinishFailed"
		>
			<SyFormItem name="password" label="新密码" has-feedback extra="至少 8 位，并包含字母和数字">
				<SyInput
					v-model="model.password"
					password
					placeholder="请输入新密码"
					autocomplete="new-password"
					@change="handlePasswordChange"
				/>
			</SyFormItem>

			<SyFormItem name="confirmPassword" label="确认密码" has-feedback>
				<SyInput
					v-model="model.confirmPassword"
					password
					placeholder="请再次输入密码"
					autocomplete="new-password"
				/>
			</SyFormItem>

			<SyFormItem :show-label="false">
				<div class="form-actions">
					<SyButton native-type="submit">确认修改</SyButton>
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
	password: '',
	confirmPassword: '',
});

const rules: FormRules = {
	password: [
		{ required: true, message: '请输入新密码' },
		{
			validator: (_rule, value) => {
				const password = String(value ?? '');

				if (password.length < 8) return '密码长度不能少于 8 位';
				if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
					return '密码必须同时包含字母和数字';
				}

				return true;
			},
		},
	],
	confirmPassword: [
		{ required: true, message: '请再次输入密码' },
		{
			validator: (_rule, value, currentModel) => {
				if (value !== currentModel.password) {
					return '两次输入的密码不一致';
				}

				return true;
			},
		},
	],
};

/**
 * 密码变化后清除确认密码的旧校验结果
 */
function handlePasswordChange(): void {
	formRef.value?.clearValidate(['confirmPassword']);
	resultMessage.value = '';
}

/**
 * 处理跨字段校验成功事件
 */
function handleFinish(): void {
	resultStatus.value = 'success';
	resultMessage.value = '两次密码一致，可以继续提交到服务端';
}

/**
 * 处理跨字段校验失败事件
 * @param errorInfo 表单校验错误信息
 */
function handleFinishFailed(errorInfo: ValidateErrorInfo): void {
	resultStatus.value = 'error';
	resultMessage.value = errorInfo.errorFields[0]?.errors[0] ?? '密码校验失败';
}

/**
 * 重置密码字段和校验状态
 */
function handleReset(): void {
	formRef.value?.resetFields();
	resultMessage.value = '';
}
</script>

<style scoped>
.custom-validation-demo {
	width: min(100%, 480px);
}

.form-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.demo-result {
	margin: 4px 0 0;
	font-size: 13px;
	line-height: 1.6;
}

.demo-result--success {
	color: var(--sy-color-success-7);
}

.demo-result--error {
	color: var(--sy-color-error-7);
}
</style>
