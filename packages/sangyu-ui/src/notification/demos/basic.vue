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
	import SyNotification from '../index';
	const openNotification = () => {
		SyNotification.info({
			title: '系统通知',
			content: '欢迎使用 Sangyu UI',
		});
	};
</script>
