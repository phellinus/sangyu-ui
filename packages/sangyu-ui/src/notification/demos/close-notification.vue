<docs>
---
title: Notification 关闭的回调函数
---

这是notification的onClose回调函数的演示。
</docs>

<template>
	<div style="display: flex; gap: 10px">
		<sy-button color="primary" @click="openNotificationInfo">回调函数的演示</sy-button>
	</div>
</template>

<script lang="ts" setup>
	import { SyButton, SyNotification } from 'sangyu-ui';

	const openNotificationInfo = () => {
		SyNotification.info({
			title: '系统通知',
			content: '系统提示通知info',
			type: 'info',
			onClose: () => openNotificationSuccess(),
		});
	};
	const openNotificationSuccess = () => {
		SyNotification.info({
			title: '系统通知',
			content: '你已经成功关闭当前的消息提示',
			type: 'success',
		});
	};
</script>
