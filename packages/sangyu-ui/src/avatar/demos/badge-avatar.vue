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
		>
			<template #badge>12</template>
		</SyAvatar>
		<SyAvatar
			bgcolor="warning"
			color="#f5f7f8"
			badge-position="bottom-right"
			badge-color="warning"
			src="https://sangyuoj.oss-cn-hangzhou.aliyuncs.com/oj/avatar/312062759d2f4e099eaf79bc9cfdfbad.jpeg"
		>
			<template #badge>
				<SyIcon name="aim" size="22"></SyIcon>
			</template>
		</SyAvatar>
	</div>
</template>

<script lang="ts" setup>
	import { SyIcon } from '@sangyu-ui/icons';
	import { SyAvatar } from 'sangyu-ui';
</script>
