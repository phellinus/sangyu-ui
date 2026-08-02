<docs>
---
title: SyResult 带操作引导
---

结果组件不仅要反馈状态，还应该给出下一步动作，让用户知道接下来该做什么。
</docs>

<template>
	<SyResult status="error" title="同步失败" sub-title="部分资源校验未通过，请修复后重新提交。">
		<template #default>
			<div class="result-note">建议优先检查：文件格式、字段完整性、网络连接状态。</div>
		</template>
		<template #extra>
			<SyButton color="error">重新提交</SyButton>
			<SyButton type="border" color="error">查看原因</SyButton>
		</template>
	</SyResult>
</template>

<script setup>
import { SyButton, SyResult } from 'sangyu-ui';
</script>

<style scoped>
.result-note {
	max-width: 420px;
}
</style>
