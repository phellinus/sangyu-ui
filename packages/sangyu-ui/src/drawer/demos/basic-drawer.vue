<docs>
---
title: 基础用法
---

通过 `visible` 控制抽屉开关
</docs>

<template>
	<div>
		<SyButton @click="visible = true">打开抽屉</SyButton>
		<SyDrawer v-model:visible="visible" title="基础抽屉" :width="360">这里是抽屉内容</SyDrawer>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SyButton, SyDrawer } from 'sangyu-ui';

// 控制抽屉显示状态
const visible = ref(false);
</script>
