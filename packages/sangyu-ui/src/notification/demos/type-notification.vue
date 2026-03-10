<docs>
---
title: Notification 的不同类型
---

这是notification支持不同的类型，包括info、success、warning、error。
</docs>

<template>
	<div style="display: flex; gap: 10px">
		<sy-button color="primary" @click="openNotificationInfo">info</sy-button>
		<sy-button color="success" @click="openNotificationSuccess">success</sy-button>
		<sy-button color="warning" @click="openNotificationWarning">warning</sy-button>
		<sy-button color="error" @click="openNotificationError">error</sy-button>
	</div>
</template>

<script lang="ts" setup>
	import { SyButton, SyNotification } from 'sangyu-ui';

	const openNotificationInfo = () => {
		SyNotification.info({
			title: '系统通知',
			content: '系统提示通知info',
			type: 'info',
		});
	};
	const openNotificationSuccess = () => {
		SyNotification.info({
			title: '系统通知',
			content: '系统提示通知success',
			type: 'success',
		});
	};
	const openNotificationWarning = () => {
		SyNotification.info({
			title: '系统通知',
			content: '系统提示通知warning',
			type: 'warning',
		});
	};
	const openNotificationError = () => {
		SyNotification.info({
			title: '系统通知',
			content: '系统提示通知error',
			type: 'error',
		});
	};
</script>
