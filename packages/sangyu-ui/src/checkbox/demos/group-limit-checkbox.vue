<docs>
---
title: 数量限制与禁用
---

使用 `min` 和 `max` 限制选择数量。达到下限时不能继续取消，达到上限时不能继续选择；`disabled` 可统一禁用整个 Group。
</docs>

<template>
	<div class="demo-stack">
		<div class="demo-block">
			<div class="demo-title">至少选择 1 项，最多选择 3 项</div>
			<sy-checkbox-group v-model="skills" :min="1" :max="3">
				<sy-checkbox value="vue">Vue</sy-checkbox>
				<sy-checkbox value="typescript">TypeScript</sy-checkbox>
				<sy-checkbox value="vite">Vite</sy-checkbox>
				<sy-checkbox value="vitest">Vitest</sy-checkbox>
			</sy-checkbox-group>
			<div class="current-value">已选择 {{ skills.length }} 项：{{ skills }}</div>
		</div>

		<div class="demo-block">
			<div class="demo-title">统一禁用</div>
			<sy-checkbox-group v-model="lockedOptions" disabled>
				<sy-checkbox value="audit">审计日志</sy-checkbox>
				<sy-checkbox value="backup">自动备份</sy-checkbox>
				<sy-checkbox value="alert">风险告警</sy-checkbox>
			</sy-checkbox-group>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyCheckbox, SyCheckboxGroup } from 'sangyu-ui';

const skills = ref(['vue', 'typescript']);
const lockedOptions = ref(['audit', 'alert']);
</script>

<style scoped>
.demo-stack,
.demo-block {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.demo-stack {
	gap: 26px;
}

.demo-block {
	gap: 14px;
}

.demo-title,
.current-value {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
