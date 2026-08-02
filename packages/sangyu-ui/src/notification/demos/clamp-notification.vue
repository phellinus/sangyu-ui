<docs>
---
title: Notification 的文本长度溢出设置
---

这是notification的文本长度溢出设置的演示。通过设置clamp属性，可以限制通知内容的行数，超出部分会自动省略。
</docs>

<template>
	<div style="display: flex; gap: 10px">
		<sy-button @click="openNotification">长度只展示1行</sy-button>
		<sy-button @click="openNotificationThree">长度只展示3行</sy-button>
	</div>
</template>

<script lang="ts" setup>
import { SyNotification, SyButton } from 'sangyu-ui';

const openNotification = () => {
	SyNotification.info({
		title: '系统通知',
		content: '这是一条系统通知，这条通知内容的长度超过了默认的显示长度，因此会自动省略。',
		clamp: 1,
	});
};
const openNotificationThree = () => {
	SyNotification.info({
		title: '系统通知',
		content:
			'这是一条系统通知，这条通知内容的长度超过了默认的显示长度，因此会自动省略。我要继续编写三行了，为了测试,这是一条系统通知，这条通知内容的长度超过了默认的显示长度，因此会自动省略。我要继续编写三行了，为了测试',
		clamp: 3,
	});
};
</script>
