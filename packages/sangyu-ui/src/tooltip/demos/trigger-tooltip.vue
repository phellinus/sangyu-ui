<docs>
---
title: 触发方式
---
`tooltip` 通过设置trigger，包括`hover`和`click`两种方式。
</docs>

<template>
	<SyTooltip placement="top">
		<sy-button type="border" color="primary" customStyle="margin: 30px">hover触发方式</sy-button>
		<template #content>
			<div>hover触发方式</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" trigger="click">
		<sy-button type="border" color="success" customStyle="margin: 30px">click触发方式</sy-button>
		<template #content>
			<div>click触发方式</div>
		</template>
	</SyTooltip>
</template>

<script lang="ts" setup>
import { SyTooltip } from 'sangyu-ui';
</script>
