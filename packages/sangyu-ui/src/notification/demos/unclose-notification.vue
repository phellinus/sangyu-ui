<docs>
---
title: Notification 取消关闭功能
---

这是notification通过设置showClose为false来取消关闭功能的示例。
</docs>

<template>
	<div style="display: flex; gap: 10px">
		<sy-button color="primary" @click="openNotificationInfo">取消关闭功能</sy-button>
	</div>
</template>

<script lang="ts" setup>
	import { SyButton, SyNotification } from 'sangyu-ui';

	const openNotificationInfo = () => {
		SyNotification.info({
			title: '系统通知',
			content: '系统提示通知info',
			showClose: false,
			type: 'info',
		});
	};
</script>
