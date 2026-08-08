<docs>
---
title: 动态增减字段
---

动态字段挂载时会自动注册，卸载时会自动注销。示例使用稳定 ID 作为字段路径，删除中间项时不会影响其他字段的注册状态。
</docs>

<template>
	<div class="dynamic-form-demo">
		<SyForm
			ref="formRef"
			:model="model"
			layout="vertical"
			validate-trigger="blur"
			@finish="handleFinish"
			@finish-failed="handleFinishFailed"
		>
			<div v-for="(contact, index) in contacts" :key="contact.id" class="contact-group">
				<div class="contact-heading">
					<strong>联系人 {{ index + 1 }}</strong>
					<SyButton
						type="flat"
						native-type="button"
						:disabled="contacts.length === 1"
						@click="removeContact(contact.id)"
					>
						删除
					</SyButton>
				</div>

				<SyFormItem :name="['contacts', contact.id, 'name']" label="姓名" :rules="nameRules" has-feedback>
					<SyInput v-model="model.contacts[contact.id].name" placeholder="请输入联系人姓名" />
				</SyFormItem>

				<SyFormItem :name="['contacts', contact.id, 'email']" label="邮箱" :rules="emailRules" has-feedback>
					<SyInput
						v-model="model.contacts[contact.id].email"
						placeholder="name@example.com"
						autocomplete="email"
					/>
				</SyFormItem>
			</div>

			<div class="form-actions">
				<SyButton type="border" native-type="button" :disabled="contacts.length >= 5" @click="addContact">
					添加联系人
				</SyButton>
				<SyButton native-type="submit">校验全部联系人</SyButton>
			</div>
		</SyForm>

		<p class="contact-count">当前共 {{ contacts.length }} 位联系人，最多添加 5 位</p>
		<p v-if="resultMessage" :class="['demo-result', `demo-result--${resultStatus}`]" role="status">
			{{ resultMessage }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SyButton, SyForm, SyFormItem, SyInput } from 'sangyu-ui';
import type { FormInstance, FormRule, ValidateErrorInfo } from '../Form.type';

interface ContactEntry {
	id: string;
}

interface ContactValue {
	name: string;
	email: string;
}

let contactSeed = 1;
const firstContactId = `contact-${contactSeed}`;
const formRef = ref<FormInstance>();
const contacts = ref<ContactEntry[]>([{ id: firstContactId }]);
const resultStatus = ref<'success' | 'error'>('success');
const resultMessage = ref('');

const model = reactive({
	contacts: {
		[firstContactId]: {
			name: '',
			email: '',
		},
	} as Record<string, ContactValue>,
});

const nameRules: FormRule[] = [
	{ required: true, whitespace: true, message: '请输入联系人姓名' },
	{ min: 2, message: '姓名至少需要 2 个字符' },
];

const emailRules: FormRule[] = [
	{ required: true, message: '请输入联系人邮箱' },
	{ type: 'email', message: '请输入有效的邮箱地址' },
];

/**
 * 添加一个带有稳定字段路径的联系人
 */
function addContact(): void {
	if (contacts.value.length >= 5) return;

	contactSeed += 1;
	const id = `contact-${contactSeed}`;

	model.contacts[id] = {
		name: '',
		email: '',
	};
	contacts.value.push({ id });
	resultMessage.value = '';
}

/**
 * 删除指定联系人及其模型数据
 * @param id 联系人稳定标识
 */
function removeContact(id: string): void {
	if (contacts.value.length === 1) return;

	contacts.value = contacts.value.filter((contact) => contact.id !== id);
	Reflect.deleteProperty(model.contacts, id);
	resultMessage.value = '';
}

/**
 * 处理全部联系人校验成功事件
 */
function handleFinish(): void {
	resultStatus.value = 'success';
	resultMessage.value = `已通过 ${contacts.value.length} 位联系人的字段校验`;
}

/**
 * 处理动态字段校验失败事件
 * @param errorInfo 表单校验错误信息
 */
function handleFinishFailed(errorInfo: ValidateErrorInfo): void {
	resultStatus.value = 'error';
	resultMessage.value = `还有 ${errorInfo.errorFields.length} 个动态字段需要修改`;
}
</script>

<style scoped>
.dynamic-form-demo {
	width: min(100%, 620px);
}

.contact-group {
	margin-bottom: 18px;
	padding: 16px 16px 2px;
	border: 1px solid var(--sy-color-border);
	border-radius: 10px;
}

.contact-heading {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 14px;
}

.form-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.contact-count,
.demo-result {
	margin: 10px 0 0;
	font-size: 13px;
	line-height: 1.6;
}

.contact-count {
	color: var(--sy-color-text-secondary);
}

.demo-result--success {
	color: var(--sy-color-success-7);
}

.demo-result--error {
	color: var(--sy-color-error-7);
}

@media (max-width: 640px) {
	.contact-group {
		padding-inline: 12px;
	}
}
</style>
