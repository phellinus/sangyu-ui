<docs>
---
title: tooltip设置type为border
---
`tooltip` 通过type设置成border，可以做到边框类型。
</docs>

<template>
	<SyTooltip placement="top" content="测试内容" color="primary" type="border">
		<sy-button type="border" color="primary" customStyle="margin: 30px">primary</sy-button>
		<template #content>
			<div>12312312313</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" content="测试内容" color="success" type="border">
		<sy-button type="border" color="success" customStyle="margin: 30px">success</sy-button>
		<template #content>
			<div>12312312313</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" content="测试内容" color="warning" type="border">
		<sy-button type="border" color="warning" customStyle="margin: 30px">warning</sy-button>
		<template #content>
			<div>12312312313</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" content="测试内容" color="error" type="border">
		<sy-button type="border" color="error" customStyle="margin: 20px">error</sy-button>
		<template #content>
			<div>12312312313</div>
		</template>
	</SyTooltip>
	<SyTooltip placement="top" content="测试内容" color="#7d33ff" type="border">
		<sy-button type="border" color="#7d33ff" customStyle="margin: 20px">hex</sy-button>
		<template #content>
			<div>#7d33ff</div>
		</template>
	</SyTooltip>
</template>

<script lang="ts" setup>
import { SyTooltip } from 'sangyu-ui';
</script>
