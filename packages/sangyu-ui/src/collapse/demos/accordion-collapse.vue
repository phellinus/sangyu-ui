<docs>
---
title: SyCollapse 手风琴模式
---

开启 `accordion` 后只允许一个面板展开，绑定值为单个名称或 `undefined`。
</docs>

<template>
	<div class="accordion-collapse-demo">
		<div class="accordion-collapse-demo__heading">
			<div>
				<span class="accordion-collapse-demo__eyebrow">QUICK START</span>
				<h3>如何开始使用</h3>
			</div>
			<span class="accordion-collapse-demo__active">当前步骤 {{ activeStep ?? '未选择' }}</span>
		</div>
		<SyCollapse v-model="activeStep" accordion>
			<SyCollapseItem name="install">
				<template #header>
					<span class="accordion-collapse-demo__title">
						01
						<b>安装依赖</b>
					</span>
				</template>
				<p>使用包管理器安装 Sangyu Design UI，并在应用入口中引入组件样式</p>
			</SyCollapseItem>
			<SyCollapseItem name="register">
				<template #header>
					<span class="accordion-collapse-demo__title">
						02
						<b>注册组件</b>
					</span>
				</template>
				<p>按需导入组件可控制依赖范围，也可以通过插件统一注册</p>
			</SyCollapseItem>
			<SyCollapseItem name="theme">
				<template #header>
					<span class="accordion-collapse-demo__title">
						03
						<b>配置主题</b>
					</span>
				</template>
				<p>使用 ThemeProvider 设置亮暗主题，并按需覆盖局部组件 Token</p>
			</SyCollapseItem>
		</SyCollapse>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyCollapse, SyCollapseItem } from 'sangyu-ui';

const activeStep = ref<string | undefined>('install');
</script>

<style scoped>
.accordion-collapse-demo {
	max-width: 640px;
	padding: 24px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-lg);
	background: var(--sy-color-surface);
}

.accordion-collapse-demo__heading {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	margin-bottom: 18px;
}

.accordion-collapse-demo__eyebrow {
	color: var(--sy-color-success);
	font-size: var(--sy-font-size-sm);
	font-weight: 700;
	letter-spacing: 0.08em;
}

.accordion-collapse-demo h3 {
	margin: 6px 0 0;
	color: var(--sy-color-text-primary);
	font-size: 20px;
}

.accordion-collapse-demo__active {
	padding: 6px 10px;
	border-radius: var(--sy-radius-round);
	background: color-mix(in srgb, var(--sy-color-success) 12%, transparent);
	color: var(--sy-color-success);
	font-size: var(--sy-font-size-sm);
	font-weight: 600;
}

.accordion-collapse-demo__title {
	color: var(--sy-color-primary);
	font-size: var(--sy-font-size-sm);
}

.accordion-collapse-demo__title b {
	margin-left: 8px;
	color: var(--sy-color-text-primary);
	font-size: var(--sy-font-size-md);
}

.accordion-collapse-demo p {
	margin: 0;
	color: var(--sy-color-text-secondary);
	line-height: 1.7;
}
</style>
