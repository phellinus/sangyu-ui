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
		<SyAvatar bgcolor="success" color="#f5f7f8">
			<template #text>ABCDEFG</template>
		</SyAvatar>
		<SyAvatar bgcolor="error" color="#f5f7f8">
			<template #text>BCDEFG</template>
		</SyAvatar>
		<SyAvatar bgcolor="warning" color="#f5f7f8">
			<template #text>CDEFG</template>
		</SyAvatar>
		<SyAvatar bgcolor="primary" color="#f5f7f8">
			<template #text>CDEFG</template>
		</SyAvatar>
		<SyAvatar icon="camera" bgcolor="success" color="#f5f7f8"></SyAvatar>
		<SyAvatar
			src="https://sangyuoj.oss-cn-hangzhou.aliyuncs.com/oj/avatar/312062759d2f4e099eaf79bc9cfdfbad.jpeg"
		></SyAvatar>
	</div>
</template>

<script lang="ts" setup>
	import { SyAvatar } from 'sangyu-ui';
</script>
