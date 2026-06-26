<docs>
---
title: 自定义值
---

通过 `activeValue` 和 `inactiveValue` 可以让 `Switch` 直接驱动字符串或数字类型的业务值，而不是只处理布尔值。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-block">
			<div class="demo-title">字符串值</div>
			<sy-switch
				v-model="publishStatus"
				active-value="published"
				inactive-value="draft"
				checked-text="已发布"
				unchecked-text="草稿"
			/>
			<div class="current-value">当前值：{{ publishStatus }}</div>
		</div>

		<div class="demo-block">
			<div class="demo-title">数字值</div>
			<sy-switch
				v-model="powerMode"
				:active-value="1"
				:inactive-value="0"
				checked-text="高性能"
				unchecked-text="节能"
			/>
			<div class="current-value">当前值：{{ powerMode }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SySwitch } from 'sangyu-ui';

	const publishStatus = ref<'published' | 'draft'>('draft');
	const powerMode = ref<0 | 1>(1);
</script>

<style scoped>
	.demo-stack,
	.demo-block {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.demo-stack {
		gap: 24px;
	}

	.demo-block {
		gap: 12px;
	}

	.demo-title,
	.current-value {
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}
</style>
