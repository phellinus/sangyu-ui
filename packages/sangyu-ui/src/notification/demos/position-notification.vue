<docs>
---
title: Notification 的不同位置
---

这是notification支持不同的位置, 包括'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
</docs>

<template>
	<div style="display: flex; gap: 10px">
		<sy-button color="primary" @click="openNotificationTopRight">右上</sy-button>
		<sy-button color="success" @click="openNotificationBottomRight">右下</sy-button>
		<sy-button color="warning" @click="openNotificationTopLeft">左上</sy-button>
		<sy-button color="error" @click="openNotificationBottomLeft">左下</sy-button>
	</div>
</template>

<script lang="ts" setup>
import { SyButton, SyNotification } from 'sangyu-ui';

const openNotificationTopRight = () => {
	SyNotification.info({
		title: '系统通知',
		content: '系统提示通知info',
	});
};
const openNotificationBottomRight = () => {
	SyNotification.info({
		title: '系统通知',
		content: '系统提示通知success',
		position: 'bottom-right',
	});
};
const openNotificationTopLeft = () => {
	SyNotification.info({
		title: '系统通知',
		content: '系统提示通知warning',
		position: 'top-left',
	});
};
const openNotificationBottomLeft = () => {
	SyNotification.info({
		title: '系统通知',
		content: '系统提示通知error',
		position: 'bottom-left',
	});
};
</script>
