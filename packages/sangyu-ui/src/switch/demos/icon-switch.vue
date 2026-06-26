<docs>
---
title: 图标与配色
---

图标模式直接复用 `SyIcon`。可以通过 `activeIconName / inactiveIconName` 指定不同状态的图标，也可以配合 `thumb` 插槽完全自定义圆钮内容。
</docs>

<template>
	<div class="demo-grid">
		<div class="demo-block">
			<div class="demo-title">图标属性</div>
			<sy-switch
				v-model="wifi"
				icon
				color="#0f766e"
				inactive-color="#e6f7f5"
				active-icon-name="check-small"
				inactive-icon-name="close-small"
				checked-text="无线网络"
				unchecked-text="无线网络"
			/>
			<sy-switch
				v-model="nightMode"
				icon
				shape="square"
				color="#7c3aed"
				inactive-color="#f3e8ff"
				active-icon-name="preview-open"
				inactive-icon-name="preview-close"
				checked-text="夜间模式"
				unchecked-text="夜间模式"
			/>
		</div>

		<div class="demo-block">
			<div class="demo-title">自定义 thumb</div>
			<sy-switch v-model="power" color="#ea580c" inactive-color="#fff1e8" checked-text="电源控制" unchecked-text="电源控制">
				<template #thumb="{ checked }">
					<SyIcon :name="checked ? 'power' : 'sleep'" :size="12" />
				</template>
			</sy-switch>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SySwitch } from 'sangyu-ui';
	import { SyIcon } from '@sangyu-ui/icons';

	const wifi = ref(true);
	const nightMode = ref(false);
	const power = ref(true);
</script>

<style scoped>
	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
