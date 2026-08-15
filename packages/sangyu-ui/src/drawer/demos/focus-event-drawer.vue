<docs>
---
title: 键盘、焦点与事件
---

配置 `keyboard`、`lockScroll`、`autoFocus`、`trapFocus` 和 `restoreFocus`，并监听 `update:visible` 与 `close` 事件。
</docs>

<template>
	<div class="focus-demo">
		<div class="demo-options">
			<label>
				<input v-model="keyboard" type="checkbox" />
				Esc 关闭
			</label>
			<label>
				<input v-model="lockScroll" type="checkbox" />
				锁定页面滚动
			</label>
			<label>
				<input v-model="autoFocus" type="checkbox" />
				自动聚焦
			</label>
			<label>
				<input v-model="trapFocus" type="checkbox" />
				限制 Tab 焦点
			</label>
			<label>
				<input v-model="restoreFocus" type="checkbox" />
				恢复打开前焦点
			</label>
		</div>

		<SyButton @click="openDrawer">打开抽屉</SyButton>
		<p class="event-message">{{ eventMessage }}</p>

		<SyDrawer
			:visible="visible"
			title="键盘与焦点管理"
			:keyboard="keyboard"
			:lock-scroll="lockScroll"
			:auto-focus="autoFocus"
			:trap-focus="trapFocus"
			:restore-focus="restoreFocus"
			@update:visible="handleVisibleChange"
			@close="handleClose"
		>
			<div class="focus-fields">
				<label>
					姓名
					<input placeholder="请输入姓名" />
				</label>
				<label>
					邮箱
					<input type="email" placeholder="请输入邮箱" />
				</label>
				<button type="button">抽屉内原生按钮</button>
			</div>
		</SyDrawer>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';

const visible = ref(false);
const keyboard = ref(true);
const lockScroll = ref(true);
const autoFocus = ref(true);
const trapFocus = ref(true);
const restoreFocus = ref(true);
const eventMessage = ref('尚未触发关闭事件');

// 显式处理 update:visible 事件用于展示双向绑定过程
const handleVisibleChange = (value: boolean) => {
	visible.value = value;
};

// 记录触发 close 事件的原始交互类型
const handleClose = (event?: Event) => {
	if (event instanceof KeyboardEvent) {
		eventMessage.value = 'close：通过 Esc 键关闭';
		return;
	}

	eventMessage.value = 'close：通过鼠标点击关闭';
};

const openDrawer = () => {
	eventMessage.value = '抽屉已打开，等待关闭事件';
	visible.value = true;
};
</script>

<style scoped>
.focus-demo,
.focus-fields,
.focus-fields label {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
}

.demo-options {
	display: flex;
	flex-wrap: wrap;
	gap: 12px 18px;
}

.demo-options label {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	cursor: pointer;
}

.event-message {
	margin: 0;
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}

.focus-fields,
.focus-fields label,
.focus-fields input {
	box-sizing: border-box;
	width: 100%;
}

.focus-fields input {
	padding: 9px 12px;
	border: 1px solid var(--sy-color-border);
	border-radius: 8px;
}
</style>
