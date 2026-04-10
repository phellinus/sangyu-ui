<docs>
---
title: SySteps 基础步骤条
---

最常见的步骤流展示方式，适合注册、下单、审批等需要明确阶段感的场景。
</docs>

<template>
	<SySteps :active="1">
		<SyStep title="提交需求" description="创建工单并补充必要说明" />
		<SyStep title="设计评审" description="同步方案、交互与边界情况" />
		<SyStep title="开发联调" description="完成页面与接口联调" />
		<SyStep title="上线验收" description="灰度发布并回收反馈" />
	</SySteps>
</template>

<script setup>
	import { SyStep, SySteps } from 'sangyu-ui';
</script>
