<docs>
---
title: SySteps 纵向步骤条
---

当每个步骤说明较长，或页面本身是信息流布局时，使用纵向排列会更清晰。
</docs>

<template>
	<SySteps direction="vertical" :active="2">
		<SyStep title="账户验证" description="确认账号信息、绑定手机号与基础安全设置。" />
		<SyStep title="资料完善" description="补充组织信息、成员角色与协作范围。" />
		<SyStep title="审批中" description="系统正在等待管理员审核，通常 1 个工作日内完成。" />
		<SyStep title="启用成功" description="审核通过后自动开通相关模块与权限。" />
	</SySteps>
</template>

<script setup>
import { SyStep, SySteps } from 'sangyu-ui';
</script>
