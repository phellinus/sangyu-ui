<docs>
---
title: 状态展示
---

支持加载、禁用和半选状态。`indeterminate` 只负责视觉状态，实际值仍由 `v-model` 或业务逻辑控制。
</docs>

<template>
	<div class="demo-grid">
		<div class="demo-block">
			<div class="demo-title">常规状态</div>
			<sy-switch v-model="normal" checked-text="已开启" unchecked-text="未开启" />
			<sy-switch v-model="checked" checked-text="运行中" unchecked-text="已暂停" />
			<sy-switch v-model="partial" indeterminate checked-text="部分启用" unchecked-text="部分启用" />
		</div>

		<div class="demo-block">
			<div class="demo-title">不可交互</div>
			<sy-switch :model-value="false" disabled unchecked-text="禁用" />
			<sy-switch :model-value="true" disabled checked-text="已锁定" />
			<sy-switch :model-value="true" loading checked-text="保存中" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SySwitch } from 'sangyu-ui';

	const normal = ref(false);
	const checked = ref(true);
	const partial = ref(false);
</script>

<style scoped>
	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 28px;
	}

	.demo-block {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 14px;
	}

	.demo-title {
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}
</style>
