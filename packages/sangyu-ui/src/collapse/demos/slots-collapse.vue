<docs>
---
title: SyCollapse 自定义插槽
---

通过 `header`、`extra` 和 `expand-icon` 插槽调整标题、附加操作和展开图标。
</docs>

<template>
	<div class="slots-collapse-demo">
		<div class="slots-collapse-demo__heading">
			<span class="slots-collapse-demo__eyebrow">CUSTOM SLOTS</span>
			<h3>团队工作区</h3>
		</div>
		<SyCollapse :default-value="['design']">
			<SyCollapseItem name="design">
				<template #header>
					<span class="slots-collapse-demo__title">
						<span class="slots-collapse-demo__badge">D</span>
						<span>
							<b>设计系统</b>
							<small>12 个文件 · 刚刚更新</small>
						</span>
					</span>
				</template>
				<template #extra>
					<button class="slots-collapse-demo__action" type="button" @click="notice = '已打开设计系统'">
						打开
					</button>
				</template>
				<template #expand-icon="{ expanded }">
					<span class="slots-collapse-demo__chevron">{{ expanded ? '−' : '+' }}</span>
				</template>
				<p class="slots-collapse-demo__body">
					颜色、排版、间距和组件规范集中在这里，方便团队保持一致的界面体验
				</p>
			</SyCollapseItem>
			<SyCollapseItem name="research">
				<template #header>
					<span class="slots-collapse-demo__title">
						<span class="slots-collapse-demo__badge is-purple">R</span>
						<span>
							<b>用户研究</b>
							<small>8 个文档 · 3 位协作者</small>
						</span>
					</span>
				</template>
				<template #extra>
					<button class="slots-collapse-demo__action" type="button" @click="notice = '已打开用户研究'">
						打开
					</button>
				</template>
				<p class="slots-collapse-demo__body">
					调研结论、访谈记录和可用性测试结果，帮助产品决策贴近真实用户需求
				</p>
			</SyCollapseItem>
		</SyCollapse>
		<p class="slots-collapse-demo__notice">{{ notice || '右侧“打开”操作不会切换面板' }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyCollapse, SyCollapseItem } from 'sangyu-ui';

const notice = ref('');
</script>

<style scoped>
.slots-collapse-demo {
	max-width: 680px;
	padding: 24px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-lg);
	background: var(--sy-color-surface);
}

.slots-collapse-demo__heading {
	margin-bottom: 18px;
}

.slots-collapse-demo__eyebrow {
	color: var(--sy-color-primary);
	font-size: var(--sy-font-size-sm);
	font-weight: 700;
	letter-spacing: 0.08em;
}

.slots-collapse-demo h3 {
	margin: 6px 0 0;
	color: var(--sy-color-text-primary);
	font-size: 20px;
}

.slots-collapse-demo__title {
	display: inline-flex;
	align-items: center;
	gap: 12px;
}

.slots-collapse-demo__badge {
	display: inline-grid;
	place-items: center;
	width: 34px;
	height: 34px;
	border-radius: 11px;
	background: color-mix(in srgb, var(--sy-color-primary) 14%, transparent);
	color: var(--sy-color-primary);
	font-weight: 700;
}

.slots-collapse-demo__badge.is-purple {
	background: color-mix(in srgb, #8b5cf6 14%, transparent);
	color: #8b5cf6;
}

.slots-collapse-demo__title b,
.slots-collapse-demo__title small {
	display: block;
}

.slots-collapse-demo__title b {
	color: var(--sy-color-text-primary);
}

.slots-collapse-demo__title small {
	margin-top: 3px;
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-sm);
	font-weight: 400;
}

.slots-collapse-demo__action {
	padding: 5px 10px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-sm);
	background: var(--sy-color-surface);
	color: var(--sy-color-primary);
	cursor: pointer;
}

.slots-collapse-demo__action:hover {
	border-color: var(--sy-color-primary);
}

.slots-collapse-demo__chevron {
	color: var(--sy-color-primary);
	font-size: 20px;
	font-weight: 500;
}

.slots-collapse-demo__body {
	margin: 0;
	color: var(--sy-color-text-secondary);
	line-height: 1.7;
}

.slots-collapse-demo__notice {
	margin: 14px 0 0;
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-sm);
}
</style>
