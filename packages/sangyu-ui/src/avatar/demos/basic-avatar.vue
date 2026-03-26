<docs>
---
title: SyAvatar的基础用法
---
</docs>

<template>
	<div style="display: flex; gap: 10px">
		<SyAvatar>
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
	</div>
</template>

<script lang="ts" setup>
	import { SyAvatar } from 'sangyu-ui';
</script>
