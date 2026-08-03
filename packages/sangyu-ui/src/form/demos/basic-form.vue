<docs>
---
    title: 按钮类型 - border
---

`border` 类型按钮以**描边形式**呈现操作，不填充背景色，视觉上更加轻量、柔和。  
它与 `color` 属性搭配使用时，会以指定主题色作为按钮描边与文字颜色，整体风格简洁清晰。

该类型适用于：
- 页面中层级较轻的次要操作  
- 不希望过度抢眼的功能按钮  
- 需要与背景保持更高对比度与信息层次时使用  

使用方式：将 `type` 设置为 `border`。

</docs>

<template>
	<SyForm :model="model" label-width="90px">
		<SyFormItem name="username" label="用户名">
			<SyInput v-model="model.username" placeholder="请输入用户名" />
		</SyFormItem>

		<SyFormItem name="password" label="密码">
			<SyInput v-model="model.password" password placeholder="请输入密码" />
		</SyFormItem>

		<SyFormItem>
			<SyButton html-type="submit" class="submit-button">提交</SyButton>
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

<style scoped>
.submit-button {
	margin-left: 8px;
}
</style>
