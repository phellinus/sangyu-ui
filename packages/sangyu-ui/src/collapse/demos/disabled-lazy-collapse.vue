<docs>
---
title: SyCollapse 禁用与懒加载
---

`disabled` 阻止切换；`lazy` 内容在面板首次展开时才创建，之后保持挂载。
</docs>

<template>
	<div class="lazy-collapse-demo">
		<div class="lazy-collapse-demo__heading">
			<span class="lazy-collapse-demo__eyebrow">CONTENT STATES</span>
			<h3>面板状态与加载时机</h3>
			<p>第一个面板不可切换，后两个面板按需挂载内容</p>
		</div>
		<SyCollapse :default-value="['account']">
			<SyCollapseItem name="account" disabled>
				<template #header>
					<span class="lazy-collapse-demo__label">
						账户信息
						<small>已锁定</small>
					</span>
				</template>
				<p class="lazy-collapse-demo__body">此面板处于只读状态，点击标题不会改变展开状态</p>
			</SyCollapseItem>
			<SyCollapseItem name="billing" lazy>
				<template #header>
					<span class="lazy-collapse-demo__label">
						账单详情
						<small>首次展开时加载</small>
					</span>
				</template>
				<div class="lazy-collapse-demo__detail">
					<span>本月订阅</span>
					<strong>¥ 128.00</strong>
					<span>下次续费</span>
					<strong>2026 年 12 月 01 日</strong>
				</div>
			</SyCollapseItem>
			<SyCollapseItem name="history" lazy>
				<template #header>
					<span class="lazy-collapse-demo__label">
						操作记录
						<small>首次展开时加载</small>
					</span>
				</template>
				<p class="lazy-collapse-demo__body">面板关闭后内容仍保留，重新展开不会再次创建</p>
			</SyCollapseItem>
		</SyCollapse>
	</div>
</template>

<script setup lang="ts">
import { SyCollapse, SyCollapseItem } from 'sangyu-ui';
</script>

<style scoped>
.lazy-collapse-demo {
	max-width: 680px;
	padding: 24px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-lg);
	background: var(--sy-color-surface);
}

.lazy-collapse-demo__heading {
	margin-bottom: 18px;
}

.lazy-collapse-demo__eyebrow {
	color: var(--sy-color-warning);
	font-size: var(--sy-font-size-sm);
	font-weight: 700;
	letter-spacing: 0.08em;
}

.lazy-collapse-demo h3 {
	margin: 6px 0 4px;
	color: var(--sy-color-text-primary);
	font-size: 20px;
}

.lazy-collapse-demo__heading p,
.lazy-collapse-demo__body {
	margin: 0;
	color: var(--sy-color-text-secondary);
	line-height: 1.7;
}

.lazy-collapse-demo__label {
	display: inline-flex;
	align-items: center;
	gap: 10px;
}

.lazy-collapse-demo__label small {
	padding: 3px 8px;
	border-radius: var(--sy-radius-round);
	background: color-mix(in srgb, var(--sy-color-warning) 12%, transparent);
	color: var(--sy-color-warning);
	font-size: 11px;
}

.lazy-collapse-demo__detail {
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 10px 20px;
	color: var(--sy-color-text-secondary);
}

.lazy-collapse-demo__detail strong {
	color: var(--sy-color-text-primary);
	font-variant-numeric: tabular-nums;
}
</style>
