<docs>
---
title: 遮罩与关闭方式
---

通过 `mask`、`maskClosable` 和 `closable` 控制遮罩及关闭入口，同时演示 `zIndex`、`customStyle` 和自定义插槽。
</docs>

<template>
	<div class="behavior-demo">
		<div class="demo-options">
			<label>
				<input v-model="mask" type="checkbox" />
				显示遮罩
			</label>
			<label>
				<input v-model="maskClosable" type="checkbox" />
				点击遮罩关闭
			</label>
			<label>
				<input v-model="closable" type="checkbox" />
				显示关闭按钮
			</label>
		</div>

		<SyButton @click="visible = true">打开抽屉</SyButton>

		<SyDrawer
			v-model:visible="visible"
			:mask="mask"
			:mask-closable="maskClosable"
			:closable="closable"
			:z-index="1200"
			custom-style="--drawer-accent: #6366f1"
		>
			<template #title>
				<span class="custom-title">
					<span class="title-dot" />
					自定义抽屉标题
				</span>
			</template>

			<p>可以在打开前切换遮罩和关闭按钮配置</p>

			<template #closeIcon>
				<span aria-hidden="true">×</span>
			</template>

			<template #footer>
				<div class="drawer-footer">
					<SyButton type="border" @click="visible = false">取消</SyButton>
					<SyButton @click="visible = false">确认</SyButton>
				</div>
			</template>
		</SyDrawer>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';

const visible = ref(false);
const mask = ref(true);
const maskClosable = ref(true);
const closable = ref(true);
</script>

<style scoped>
.behavior-demo {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
}

.demo-options,
.drawer-footer,
.custom-title {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12px;
}

.demo-options label {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	cursor: pointer;
}

.title-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: var(--drawer-accent);
}

.drawer-footer {
	justify-content: flex-end;
}
</style>
