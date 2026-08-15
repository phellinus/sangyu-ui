<docs>
---
title: 方向与尺寸
---

通过 `placement` 设置抽屉出现方向，左右方向使用 `width`，上下方向使用 `height`。
</docs>

<template>
	<div class="drawer-demo">
		<div class="demo-actions">
			<SyButton v-for="item in placements" :key="item.value" type="border" @click="openDrawer(item.value)">
				{{ item.label }}
			</SyButton>
		</div>

		<SyDrawer
			v-model:visible="visible"
			:title="`${currentLabel}抽屉`"
			:placement="placement"
			:width="420"
			:height="240"
		>
			<p>当前方向：{{ currentLabel }}</p>
			<p>左右抽屉宽度为 420px，上下抽屉高度为 240px</p>
		</SyDrawer>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';
import type { DrawerPlacement } from '../Drawer.type';

const placements: Array<{ label: string; value: DrawerPlacement }> = [
	{ label: '从左侧打开', value: 'left' },
	{ label: '从右侧打开', value: 'right' },
	{ label: '从顶部打开', value: 'top' },
	{ label: '从底部打开', value: 'bottom' },
];

const visible = ref(false);
const placement = ref<DrawerPlacement>('right');
const currentLabel = computed(() => placements.find((item) => item.value === placement.value)?.label ?? '右侧');

// 根据按钮选择抽屉出现方向
const openDrawer = (value: DrawerPlacement) => {
	placement.value = value;
	visible.value = true;
};
</script>

<style scoped>
.drawer-demo,
.demo-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}
</style>
