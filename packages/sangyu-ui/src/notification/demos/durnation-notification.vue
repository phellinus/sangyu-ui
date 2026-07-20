<docs>
---
title: Notification 设置延长时间
---

这是notification通过设置durnation参数来设置延长时间的示例。
</docs>

<template>
	<div style="display: flex; gap: 10px">
		<sy-button color="primary" @click="openNotificationInfo">4秒后关闭</sy-button>
		<sy-button color="primary" @click="openNotificationDurnation">设置为0不会自动关闭</sy-button>
	</div>
</template>

<script lang="ts" setup>
	import { SyButton, SyNotification } from 'sangyu-ui';
	import { getCurrentInstance, h } from 'vue';
	import Four from './components/four.vue';
	const instance = getCurrentInstance();
	const openNotificationInfo = () => {
		SyNotification.info({
			title: '系统通知',
			content: h(Four),
			duration: 4000,
			type: 'info',
			appContext: instance?.appContext,
		});
	};
	const openNotificationDurnation = () => {
		SyNotification.info({
			title: '系统通知',
			content: '系统提示通知info',
			duration: 0,
			type: 'info',
		});
	};
</script>
