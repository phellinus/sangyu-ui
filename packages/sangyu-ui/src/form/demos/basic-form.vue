<template>
	<SyForm :model="model" label-width="90px">
		<SyFormItem name="username" label="用户名">
			<SyInput v-model="model.username" placeholder="请输入用户名" />
		</SyFormItem>

		<SyFormItem name="password" label="密码">
			<SyInput v-model="model.password" password placeholder="请输入密码" />
		</SyFormItem>

		<SyFormItem>
			<SyButton html-type="submit">提交</SyButton>
			<SyButton type="filled">重置</SyButton>
		</SyFormItem>
	</SyForm>
</template>

<script lang="ts" setup>
import { SyForm, SyFormItem, SyInput, SyButton } from 'sangyu-ui';
import { reactive } from 'vue';

const model = reactive({
	username: '',
	password: '',
});
</script>
