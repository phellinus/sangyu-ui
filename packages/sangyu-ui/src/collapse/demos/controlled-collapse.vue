<docs>
---
title: SyCollapse 受控展开
---

通过 `v-model` 和外部操作控制展开项，`change` 事件同步显示当前值。
</docs>

<template>
	<div class="controlled-collapse-demo">
		<div class="controlled-collapse-demo__toolbar">
			<div>
				<span class="controlled-collapse-demo__eyebrow">CONTROLLED STATE</span>
				<h3>发布检查清单</h3>
			</div>
			<div class="controlled-collapse-demo__actions">
				<SyButton type="border" color="primary" @click="openAll">全部展开</SyButton>
				<SyButton type="flat" color="primary" @click="openPanels = []">全部收起</SyButton>
			</div>
		</div>
		<SyCollapse v-model="openPanels" @change="handleChange">
			<SyCollapseItem v-for="section in sections" :key="section.name" :name="section.name">
				<template #header>
					<span class="controlled-collapse-demo__header">
						<span class="controlled-collapse-demo__dot" :class="`is-${section.status}`"></span>
						{{ section.title }}
					</span>
				</template>
				<p class="controlled-collapse-demo__body">{{ section.description }}</p>
			</SyCollapseItem>
		</SyCollapse>
		<div class="controlled-collapse-demo__state">
			<span>当前展开：{{ openPanels.length ? openPanels.join('、') : '无' }}</span>
			<span>最近 change：{{ lastChange.length ? lastChange.join('、') : '无' }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyButton, SyCollapse, SyCollapseItem } from 'sangyu-ui';
import type { CollapseValue } from 'sangyu-ui';

const sections = [
	{
		name: 'code',
		title: '代码检查',
		description: 'Lint 与类型检查均已完成，提交内容符合仓库规范',
		status: 'success',
	},
	{ name: 'test', title: '测试验证', description: '组件测试和消费者入口验证均已通过', status: 'success' },
	{ name: 'release', title: '发布记录', description: '确认版本说明、变更日志和发布窗口', status: 'pending' },
] as const;

const openPanels = ref<string[]>(['code']);
const lastChange = ref<string[]>(['code']);

const handleChange = (value: CollapseValue) => {
	lastChange.value = value === undefined ? [] : Array.isArray(value) ? value.map(String) : [String(value)];
};

const openAll = () => {
	openPanels.value = sections.map(({ name }) => name);
};
</script>

<style scoped>
.controlled-collapse-demo {
	max-width: 720px;
	padding: 24px;
	border: 1px solid var(--sy-color-border);
	border-radius: var(--sy-radius-lg);
	background: var(--sy-color-surface);
}

.controlled-collapse-demo__toolbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	margin-bottom: 18px;
}

.controlled-collapse-demo__eyebrow {
	color: var(--sy-color-primary);
	font-size: var(--sy-font-size-sm);
	font-weight: 700;
	letter-spacing: 0.08em;
}

.controlled-collapse-demo h3 {
	margin: 6px 0 0;
	color: var(--sy-color-text-primary);
	font-size: 20px;
}

.controlled-collapse-demo__actions {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.controlled-collapse-demo__header {
	display: inline-flex;
	align-items: center;
	gap: 10px;
}

.controlled-collapse-demo__dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: var(--sy-color-warning);
}

.controlled-collapse-demo__dot.is-success {
	background: var(--sy-color-success);
}

.controlled-collapse-demo__body {
	margin: 0;
	color: var(--sy-color-text-secondary);
	line-height: 1.7;
}

.controlled-collapse-demo__state {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 8px 16px;
	margin-top: 14px;
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-sm);
}

@media (max-width: 560px) {
	.controlled-collapse-demo__toolbar {
		align-items: flex-start;
		flex-direction: column;
	}
}
</style>
