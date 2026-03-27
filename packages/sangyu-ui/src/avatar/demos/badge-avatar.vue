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
	</div>
</template>

<script lang="ts" setup>
	import { SyAvatar } from 'sangyu-ui';
</script>
