<docs>
---
title: SyCard的自定义样式
---
通过`customStyle`、`headerStyle`、`bodyStyle`、`footerStyle`分别定制卡片容器与各插槽区域样式。
</docs>

<template>
	<SyCard
		:custom-style="'width: 320px; border: 1px solid #e6eaef; border-radius: 14px; background: linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%); overflow: hidden'"
		:header-style="'padding: 14px 18px; font-weight: 600; color: #1f2937; background: #f0f4f8; border-bottom: 1px solid #e6eaef'"
		:body-style="'padding: 18px; color: #4b5563; line-height: 1.7; background: #ffffff'"
		:footer-style="'padding: 12px 18px; color: #6b7280; background: #f7f9fb; border-top: 1px solid #eef1f4'"
	>
		<template #header>自定义样式卡片</template>
		主体区域展示更细致的排版与背景层次，让卡片更加轻盈且有质感。
		<template #footer>footerStyle：自定义底部样式</template>
	</SyCard>
</template>

<script lang="ts" setup>
	import { SyCard } from 'sangyu-ui';
</script>
