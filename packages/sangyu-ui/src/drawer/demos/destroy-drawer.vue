<docs>
---
title: 关闭后销毁
---

开启 `destroyOnClose` 后，抽屉关闭时会销毁内部组件，再次打开时内部状态会被重置。
</docs>

<template>
	<div class="destroy-demo">
		<label>
			<input v-model="destroyOnClose" type="checkbox" />
			关闭后销毁内部组件
		</label>
		<SyButton @click="visible = true">打开抽屉</SyButton>

		<SyDrawer v-model:visible="visible" title="编辑临时内容" :width="380" :destroy-on-close="destroyOnClose">
			<DrawerDraft />
		</SyDrawer>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';
import DrawerDraft from './components/drawer-draft.vue';

const visible = ref(false);
const destroyOnClose = ref(true);
</script>

<style scoped>
.destroy-demo {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 16px;
}

.destroy-demo label {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	cursor: pointer;
}
</style>
