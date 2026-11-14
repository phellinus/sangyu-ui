<docs>
---
title: SyCollapse 基础用法
---

通过 `defaultValue` 设置初始展开面板，默认允许多个面板同时展开。
</docs>

<template>
	<div class="collapse-demo">
		<div class="collapse-demo__intro">
			<span class="collapse-demo__eyebrow">PROJECT GUIDE</span>
			<h3>从这里开始了解项目</h3>
			<p>展开不同章节，快速浏览项目的核心信息</p>
		</div>
		<SyCollapse :default-value="['overview']">
			<SyCollapseItem name="overview">
				<template #header>
					<span class="collapse-demo__title">
						<span class="collapse-demo__number">01</span>
						项目概览
					</span>
				</template>
				<p class="collapse-demo__body">
					Sangyu Design UI 是一套面向 Vue 3 的组件库，提供一致的交互体验和可组合的组件能力
				</p>
			</SyCollapseItem>
			<SyCollapseItem name="install">
				<template #header>
					<span class="collapse-demo__title">
						<span class="collapse-demo__number">02</span>
						安装与使用
					</span>
				</template>
				<p class="collapse-demo__body">安装依赖后按需导入组件，也可以通过插件一次性注册组件</p>
			</SyCollapseItem>
			<SyCollapseItem name="theme">
				<template #header>
					<span class="collapse-demo__title">
						<span class="collapse-demo__number">03</span>
						主题配置
					</span>
				</template>
				<p class="collapse-demo__body">使用主题 Provider 管理亮暗模式，并在局部作用域中覆盖组件 Token</p>
			</SyCollapseItem>
		</SyCollapse>
		<div class="collapse-demo__hint">已默认展开「项目概览」，也可以同时打开其他章节</div>
	</div>
</template>

<script setup lang="ts">
import { SyCollapse, SyCollapseItem } from 'sangyu-ui';
</script>

<style scoped>
.collapse-demo {
	max-width: 640px;
	padding: 24px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-lg);
	background: var(--sy-color-surface);
	box-shadow: var(--sy-shadow-control);
}

.collapse-demo__intro {
	margin-bottom: 18px;
}

.collapse-demo__eyebrow {
	color: var(--sy-color-primary);
	font-size: var(--sy-font-size-sm);
	font-weight: 700;
	letter-spacing: 0.08em;
}

.collapse-demo h3 {
	margin: 8px 0 4px;
	color: var(--sy-color-text-primary);
	font-size: 20px;
}

.collapse-demo p {
	margin: 0;
	color: var(--sy-color-text-secondary);
}

.collapse-demo__title {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	font-weight: 600;
}

.collapse-demo__number {
	color: var(--sy-color-primary);
	font-size: var(--sy-font-size-sm);
	font-variant-numeric: tabular-nums;
}

.collapse-demo__body {
	line-height: 1.7;
}

.collapse-demo__hint {
	margin-top: 14px;
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-sm);
}
</style>
