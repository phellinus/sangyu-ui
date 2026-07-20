<docs>
---
title: Notification 的基本使用
---

这是notification的基本使用
</docs>

<template>
	<div>
		<sy-button @click="openNotification">打开通知</sy-button>
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
			appContext: instance?.appContext,
		});
	};
</script>
