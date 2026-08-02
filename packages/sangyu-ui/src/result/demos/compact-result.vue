<docs>
---
title: SyResult 紧凑型与异常状态
---

适合在卡片或局部区域嵌入结果反馈，也适合承载 403 / 404 / 500 这类异常状态。
</docs>

<template>
	<div class="result-demo-stack">
		<SyResult
			layout="compact"
			status="403"
			title="你暂时没有查看该项目的权限"
			sub-title="如需访问，请联系管理员为你开通对应角色后再重试。"
		>
			<template #extra>
				<SyButton color="warning">申请权限</SyButton>
			</template>
		</SyResult>
		<SyResult layout="compact" status="404" sub-title="当前链接可能已失效，或内容已经被移动。" />
	</div>
</template>

<script setup>
import { SyButton, SyResult } from 'sangyu-ui';
</script>

<style scoped>
.result-demo-stack {
	display: grid;
	gap: 20px;
}
</style>
