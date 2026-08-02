<docs>
---
title: tooltip的基础使用
---
`tooltip` 的基本用法
</docs>

<template>
	<div class="tooltip-base-box">
		<div class="row center">
			<SyTooltip placement="top-end" content="测试内容">
				<sy-button type="border" customStyle="margin: 30px">左上</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
			<SyTooltip placement="top" content="测试内容">
				<sy-button type="border" customStyle="margin: 30px">上边</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
			<SyTooltip placement="top-start" content="测试内容">
				<sy-button type="border" customStyle="margin: 30px">右上</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
		</div>
		<div class="row">
			<SyTooltip placement="left-start" content="测试内容">
				<sy-button type="border" customStyle="margin: 20px">左上</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
			<SyTooltip placement="right-start" content="测试内容">
				<sy-button type="border" customStyle="margin: 20px">右上</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
		</div>
		<div class="row">
			<SyTooltip placement="left" content="测试内容">
				<sy-button type="border" customStyle="margin: 20px">左边</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
			<SyTooltip placement="right" content="测试内容">
				<sy-button type="border" customStyle="margin: 20px">右边</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
		</div>
		<div class="row">
			<SyTooltip placement="left" content="测试内容">
				<sy-button type="border" customStyle="margin: 20px">左下</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
			<SyTooltip placement="right" content="测试内容">
				<sy-button type="border" customStyle="margin: 20px">右下</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
		</div>
		<div class="row center">
			<SyTooltip placement="bottom-end" content="测试内容">
				<sy-button type="border" customStyle="margin: 30px">左下</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
			<SyTooltip placement="bottom" content="测试内容">
				<sy-button type="border" customStyle="margin: 30px">下边</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
			<SyTooltip placement="bottom-start" content="测试内容">
				<sy-button type="border" customStyle="margin: 30px">右下</sy-button>
				<template #content>
					<div>12312312313</div>
				</template>
			</SyTooltip>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { SyTooltip } from 'sangyu-ui';
</script>
<style scoped>
.tooltip-base-box {
	width: 600px;
	margin: 0 auto;
}
.tooltip-base-box .row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.tooltip-base-box .center {
	justify-content: center;
}
</style>
