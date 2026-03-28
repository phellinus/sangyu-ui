<docs>
---
title: SyAvatar的badge用法
---
</docs>

<template>
	<div style="display: flex; gap: 10px">
		<SyAvatar badge>
			<template #text>ABCDEFG</template>
		</SyAvatar>
		<SyAvatar bgcolor="success" color="#f5f7f8" badge badge-position="top-right" badge-color="red">
			<template #text>ABCDEFG</template>
		</SyAvatar>
		<SyAvatar
			bgcolor="warning"
			color="#f5f7f8"
			badge
			badge-position="top-left"
			badge-color="red"
			src="https://sangyuoj.oss-cn-hangzhou.aliyuncs.com/oj/avatar/312062759d2f4e099eaf79bc9cfdfbad.jpeg"
		></SyAvatar>
		<SyAvatar bgcolor="primary" color="#f5f7f8" badge badge-position="bottom-left" badge-color="blue">
			<template #text>CDEFG</template>
		</SyAvatar>
		<SyAvatar
			color="#f5f7f8"
			badge-position="bottom-right"
			badge-color="success"
			src="https://sangyuoj.oss-cn-hangzhou.aliyuncs.com/oj/avatar/eed4d937295b4264bd13ee8ea716630f.png"
			:badge-offset-x="-4"
			:badge-offset-y="-4"
		>
			<template #badge>12</template>
		</SyAvatar>
		<SyAvatar
			bgcolor="warning"
			color="#f5f7f8"
			badge-position="bottom-right"
			badge-color="warning"
			src="https://sangyuoj.oss-cn-hangzhou.aliyuncs.com/oj/avatar/312062759d2f4e099eaf79bc9cfdfbad.jpeg"
			:badge-offset-x="-10"
			:badge-offset-y="-5"
		>
			<template #badge>off</template>
		</SyAvatar>
	</div>
</template>

<script lang="ts" setup>
	import { SyAvatar } from 'sangyu-ui';
</script>
