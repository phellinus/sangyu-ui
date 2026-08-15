<docs>
---
title: 自定义挂载位置
---

通过 `getContainer` 将抽屉挂载到 `body`、指定元素，也可以传入 `false` 禁用 Teleport。
</docs>

<template>
	<div id="drawer-teleport-target" class="teleport-demo">
		<div class="demo-actions">
			<SyButton type="border" @click="openDrawer('body')">挂载到 body</SyButton>
			<SyButton type="border" @click="openDrawer('selector')">挂载到指定元素</SyButton>
			<SyButton type="border" @click="openDrawer('inline')">禁用 Teleport</SyButton>
		</div>

		<p class="mount-message">当前挂载方式：{{ mountLabel }}</p>

		<SyDrawer v-model:visible="visible" title="自定义挂载位置" :width="380" :get-container="containerTarget">
			<p>当前抽屉挂载到：{{ mountLabel }}</p>
			<p>可以在浏览器开发者工具中观察抽屉根节点的位置</p>
		</SyDrawer>
	</div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';
import type { DrawerContainer } from '../Drawer.type';

type MountMode = 'body' | 'selector' | 'inline';

const visible = ref(false);
const mountMode = ref<MountMode>('body');

const containerTarget = computed<DrawerContainer>(() => {
	if (mountMode.value === 'selector') return '#drawer-teleport-target';
	if (mountMode.value === 'inline') return false;
	return 'body';
});

const mountLabel = computed(() => {
	if (mountMode.value === 'selector') return '#drawer-teleport-target';
	if (mountMode.value === 'inline') return '当前组件位置';
	return 'document.body';
});

// 切换挂载位置后等待 DOM 更新再打开抽屉
const openDrawer = async (mode: MountMode) => {
	mountMode.value = mode;
	await nextTick();
	visible.value = true;
};
</script>

<style scoped>
.teleport-demo {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 14px;
}

.demo-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.mount-message {
	margin: 0;
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
