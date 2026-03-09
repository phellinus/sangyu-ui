<docs>
---
title: Notification 的基本使用
---

这是notification的基本使用
</docs>

<template>
	<div>
		<sy-button @click="openNotification">打开通知</sy-button>
		<sy-button type="flat" @click="openNotificationSuccess">打开通知</sy-button>
	</div>
</template>

<script lang="ts" setup>
	import { SyNotification, SyButton } from 'sangyu-ui';
	import Test from './components/test.vue';
	import { getCurrentInstance, h } from 'vue';
	const instance = getCurrentInstance();
	const openNotification = () => {
		SyNotification.info({
			title: '系统通知',
			content: h(Test),
			appContext: instance.appContext,
		});
	};
	const openNotificationSuccess = () => {
		SyNotification.info({
			title: '系统通知',
			content: '系统提示超长的话，测试一百年，多长才行，我要检测换行',
			appContext: instance.appContext,
		});
	};
</script>
