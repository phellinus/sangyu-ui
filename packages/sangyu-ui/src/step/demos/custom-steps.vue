<docs>
---
title: SySteps 自定义图标与内容
---

支持通过属性或具名插槽覆盖图标、标题和描述内容，方便承载更丰富的业务表达。
</docs>

<template>
	<SySteps :active="2">
		<SyStep icon="camera" title="素材上传" description="选择需要处理的图片与视频文件" />
		<SyStep status="finish">
			<template #title>
				<div class="step-title">智能识别</div>
			</template>
			<template #description>
				<span>系统已完成标签识别、结构化整理与基础分类。</span>
			</template>
		</SyStep>
		<SyStep status="error">
			<template #icon>
				<SyIcon name="tips" />
			</template>
			<template #title>人工复核</template>
			<template #description>发现部分内容异常，需要运营人员确认后继续。</template>
		</SyStep>
		<SyStep title="归档完成" description="复核通过后自动归档并生成摘要" />
	</SySteps>
</template>

<script setup>
import { SyIcon } from '@sangyu-ui/icons';
import { SyStep, SySteps } from 'sangyu-ui';
</script>

<style scoped>
.step-title {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}
</style>
