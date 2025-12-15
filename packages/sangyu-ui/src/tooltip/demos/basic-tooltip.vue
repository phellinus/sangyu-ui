<docs>
---
title: tooltip的基础使用
---
`tooltip` 的基本用法
</docs>

<template>
	<div class="demo-container">
		<SyTooltip placement="top" content="测试内容">
			<span>12312</span>
			<template #content>
				<div>12312312313</div>
			</template>
		</SyTooltip>
		<SyTooltip placement="bottom" content="测试内容" trigger="click">
			<span>测试下面出现</span>
			<template #content>
				<div>12312312313</div>
			</template>
		</SyTooltip>
		<SyTooltip placement="left" content="测试内容">
			<sy-button>测试按钮</sy-button>
			<template #content>
				<div>12312312313</div>
			</template>
		</SyTooltip>
	</div>
</template>

<style scoped>
	.demo-container {
		display: flex;
		justify-content: space-around;
	}
</style>
