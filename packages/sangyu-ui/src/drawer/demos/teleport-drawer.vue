<docs>
---
title: 基础用法
---

通过 `visible` 控制抽屉开关
</docs>

<template>
	<div>
		<SyButton @click="visible = true">打开抽屉</SyButton>

		<label>
			<input v-model="destroyOnClose" type="checkbox" />
			关闭后销毁
		</label>

		<SyDrawer v-model:visible="visible" title="基础抽屉" :width="360" :destroy-on-close="destroyOnClose">
			<p>在下面输入内容后关闭抽屉</p>
			<input v-model="content" placeholder="请输入内容" />
		</SyDrawer>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';

// 控制抽屉显示状态
const visible = ref(false);

// 控制关闭后是否销毁内容
const destroyOnClose = ref(false);

// 用于观察内容状态是否被保留
const content = ref('');
</script>
