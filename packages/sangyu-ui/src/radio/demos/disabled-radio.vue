<docs>
---
title: 禁用与纵向排列
---

分组支持统一禁用，也支持通过 `direction="vertical"` 让选项按列展示。
</docs>

<template>
	<div class="demo-grid">
		<div class="demo-block">
			<div class="demo-title">基础单选</div>
			<sy-radio-group v-model="securityMethod" direction="vertical">
				<sy-radio label="sms">短信验证</sy-radio>
				<sy-radio label="email">邮箱验证</sy-radio>
				<sy-radio label="app" disabled>验证器 App</sy-radio>
			</sy-radio-group>
		</div>

		<div class="demo-block">
			<div class="demo-title">按钮单选</div>
			<sy-radio-group v-model="disabledButtonValue" disabled>
				<sy-radio-button label="todo">待处理</sy-radio-button>
				<sy-radio-button label="doing">处理中</sy-radio-button>
				<sy-radio-button label="done">已完成</sy-radio-button>
			</sy-radio-group>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SyRadio, SyRadioButton, SyRadioGroup } from 'sangyu-ui';
import { ref } from 'vue';

const securityMethod = ref('email');
const disabledButtonValue = ref('doing');
</script>

<style scoped>
.demo-grid {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.demo-block {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.demo-title {
	font-size: 14px;
	color: var(--sy-color-text-secondary);
}
</style>
