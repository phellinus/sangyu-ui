<docs>
---
title: tooltip不同的颜色
---
`tooltip` 通过color，设置不同的颜色，可以传递主题色， `primary` 等
</docs>

<template>
	<SyTooltip placement="top" content="测试内容" color="primary">
		<sy-button type="border" color="primary" customStyle="margin: 30px">primary</sy-button>
		<template #content>
			<div>12312312313</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" content="测试内容" color="success">
		<sy-button type="border" color="success" customStyle="margin: 30px">success</sy-button>
		<template #content>
			<div>12312312313</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" content="测试内容" color="warning">
		<sy-button type="border" color="warning" customStyle="margin: 30px">warning</sy-button>
		<template #content>
			<div>12312312313</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" content="测试内容" color="error">
		<sy-button type="border" color="error" customStyle="margin: 20px">error</sy-button>
		<template #content>
			<div>12312312313</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" content="测试内容" color="#7d33ff">
		<sy-button type="border" color="#7d33ff" customStyle="margin: 20px">hex</sy-button>
		<template #content>
			<div>#7d33ff</div>
		</template>
	</SyTooltip>
</template>

<script lang="ts" setup>
import { SyTooltip } from 'sangyu-ui';
</script>
