<docs>
---
title: SySpace 基础用法
---

预设尺寸和数字尺寸都可用于水平与垂直排列。
</docs>

<template>
	<div class="space-demo">
		<SySpace size="small">
			<button>保存</button>
			<button>取消</button>
		</SySpace>
		<SySpace direction="vertical" :size="16">
			<span>第一行</span>
			<span>第二行</span>
		</SySpace>
	</div>
</template>

<script setup lang="ts">
import { SySpace } from 'sangyu-ui';
</script>

<style scoped>
.space-demo {
	display: flex;
	align-items: flex-start;
	gap: 32px;
}
</style>
