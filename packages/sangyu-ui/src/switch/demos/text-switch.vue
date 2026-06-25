<docs>
---
title: 状态文案插槽
---

使用 `checked` 和 `unchecked` 具名插槽，可以为不同状态渲染完全不同的文案结构。
</docs>

<template>
	<div class="demo-stack">
		<sy-switch v-model="audioEnabled">
			<template #checked="{ checked }">
				<span class="state-chip state-chip--success">{{ checked ? '声音已开启' : '' }}</span>
			</template>
			<template #unchecked>
				<span class="state-chip state-chip--muted">声音已关闭</span>
			</template>
		</sy-switch>

		<sy-switch v-model="memberOnly">
			<template #checked>
				<span class="state-meta">
					<strong>会员模式</strong>
					<span>包含专属功能与折扣</span>
				</span>
			</template>
			<template #unchecked>
				<span class="state-meta">
					<strong>普通模式</strong>
					<span>适合公开访问场景</span>
				</span>
			</template>
		</sy-switch>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SySwitch } from 'sangyu-ui';

	const audioEnabled = ref(true);
	const memberOnly = ref(false);
</script>

<style scoped>
	.demo-stack {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}

	.state-chip {
		display: inline-flex;
		align-items: center;
		padding: 2px 10px;
		border-radius: 999px;
		font-size: 12px;
		font-weight: 500;
	}

	.state-chip--success {
		background-color: var(--sy-color-success-1);
		color: var(--sy-color-success-7);
	}

	.state-chip--muted {
		background-color: #f1f3f5;
		color: var(--sy-color-text-secondary);
	}

	.state-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.state-meta strong {
		font-size: 13px;
		font-weight: 600;
		color: var(--sy-color-text);
	}

	.state-meta span {
		font-size: 12px;
		color: var(--sy-color-text-secondary);
	}
</style>
