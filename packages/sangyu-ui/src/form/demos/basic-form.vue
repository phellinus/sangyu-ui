<docs>
---
title: 基础用法
---

通过 `model` 管理表单数据，通过 `rules` 配置字段校验规则。提交表单时，校验成功会触发 `finish`，校验失败会触发 `finishFailed`；也可以通过 Form 实例调用 `resetFields` 重置表单。
</docs>

<template>
	<div class="basic-form-demo">
		<SyForm
			ref="formRef"
			:model="model"
			:rules="rules"
			layout="vertical"
			validate-trigger="blur"
			@finish="handleFinish"
			@finish-failed="handleFinishFailed"
		>
			<SyFormItem name="username" label="用户名" has-feedback>
				<SyInput v-model="model.username" placeholder="请输入用户名" autocomplete="username" />
			</SyFormItem>

			<SyFormItem name="password" label="密码" has-feedback>
				<SyInput
					v-model="model.password"
					password
					placeholder="请输入至少 6 位密码"
					autocomplete="current-password"
				/>
			</SyFormItem>

			<SyFormItem name="role" label="角色" has-feedback validate-trigger="change">
				<SySelect v-model="model.role" :options="roleOptions" placeholder="请选择角色" width="100%" />
			</SyFormItem>

			<SyFormItem name="remember">
				<SyCheckbox v-model="model.remember">记住当前登录信息</SyCheckbox>
			</SyFormItem>

			<SyFormItem :show-label="false">
				<div class="form-actions">
					<SyButton native-type="submit">提交</SyButton>
					<SyButton type="border" native-type="button" @click="handleReset">重置</SyButton>
				</div>
			</SyFormItem>
		</SyForm>

		<div
			v-if="resultMessage"
			:class="['submit-result', `submit-result--${resultStatus}`]"
			role="status"
			aria-live="polite"
		>
			{{ resultMessage }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SyButton, SyCheckbox, SyForm, SyFormItem, SyInput, SySelect } from 'sangyu-ui';
import type { SelectOption, SelectValue } from '../../select/Select.type';
import type { FormInstance, FormRules, ValidateErrorInfo } from '../Form.type';

const formRef = ref<FormInstance>();
const resultStatus = ref<'success' | 'error'>('success');
const resultMessage = ref('');

const model = reactive({
	username: '',
	password: '',
	role: undefined as SelectValue | undefined,
	remember: false,
});

const roleOptions: SelectOption[] = [
	{ label: '管理员', value: 'admin' },
	{ label: '开发者', value: 'developer' },
	{ label: '访客', value: 'guest' },
];

const rules: FormRules = {
	username: [
		{ required: true, message: '请输入用户名' },
		{ min: 2, max: 20, message: '用户名长度应为 2 至 20 个字符' },
	],
	password: [
		{ required: true, message: '请输入密码' },
		{ min: 6, message: '密码长度不能少于 6 个字符' },
	],
	role: {
		required: true,
		message: '请选择角色',
		trigger: 'change',
	},
};

/**
 * 处理表单校验成功事件
 * @param values 当前表单数据快照
 */
function handleFinish(values: Record<string, unknown>): void {
	resultStatus.value = 'success';
	resultMessage.value = `提交成功，当前用户：${String(values.username)}`;
}

/**
 * 处理表单校验失败事件
 * @param errorInfo 表单校验错误信息
 */
function handleFinishFailed(errorInfo: ValidateErrorInfo): void {
	resultStatus.value = 'error';
	resultMessage.value = `提交失败，请检查 ${errorInfo.errorFields.length} 个字段`;
}

/**
 * 重置字段值和校验状态
 */
function handleReset(): void {
	formRef.value?.resetFields();
	resultMessage.value = '';
}
</script>

<style scoped>
.basic-form-demo {
	width: min(100%, 520px);
}

.form-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.submit-result {
	margin-top: 4px;
	padding: 10px 12px;
	border-radius: 8px;
	font-size: 13px;
	line-height: 1.6;
}

.submit-result--success {
	color: var(--sy-color-success-7);
	background: var(--sy-color-success-1);
}

.submit-result--error {
	color: var(--sy-color-error-7);
	background: var(--sy-color-error-1);
}
</style>
