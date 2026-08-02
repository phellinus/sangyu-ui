<docs>
---
title: 无箭头
---
`tooltip` 通过设置showArrow，可以设置是否显示箭头。
</docs>

<template>
	<SyTooltip placement="top" :showArrow="false">
		<sy-button type="border" color="primary" customStyle="margin: 30px">无箭头</sy-button>
		<template #content>
			<div>hover触发方式</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" :showArrow="false">
		<sy-button type="border" color="success" customStyle="margin: 30px">无箭头</sy-button>
		<template #content>
			<div>click触发方式</div>
		</template>
	</SyTooltip>
</template>

<script lang="ts" setup>
import { SyTooltip } from 'sangyu-ui';
</script>
