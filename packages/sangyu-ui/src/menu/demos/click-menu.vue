<docs>
---
title: SyMenu 点击事件
---

SyMenu 通过 `onSelect` 属性监听菜单项点击，回调参数为当前选中的菜单项 `index`。
</docs>

<template>
	<div class="click-menu-demo">
		<div class="menu-panel">
			<sy-menu defaultIndex="dashboard" :onSelect="handleSelect">
				<sy-menu-item index="dashboard" icon="home">Dashboard</sy-menu-item>
				<sy-menu-item index="project" icon="more-app">Project</sy-menu-item>
				<sy-sub-menu index="system" title="System">
					<sy-menu-item index="user-manage">User Manage</sy-menu-item>
					<sy-menu-item index="role-manage">Role Manage</sy-menu-item>
				</sy-sub-menu>
				<sy-menu-item index="setting" icon="settings">Setting</sy-menu-item>
			</sy-menu>
		</div>

		<div class="result-panel">
			<p class="result-label">当前点击菜单：</p>
			<p class="result-value">{{ activeMenu }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { SyMenu } from 'sangyu-ui';

	const activeMenu = ref('dashboard');

	const handleSelect = (index: string) => {
		activeMenu.value = index;
	};
</script>

<style scoped>
	.click-menu-demo {
		display: flex;
		align-items: flex-start;
		gap: 24px;
		flex-wrap: wrap;
	}

	.menu-panel {
		min-width: 220px;
	}

	.result-panel {
		min-width: 180px;
		padding: 16px;
		border-radius: 8px;
		background: #f5f7fa;
		border: 1px solid #e5e7eb;
	}

	.result-label {
		margin: 0 0 8px;
		font-size: 14px;
		color: #606266;
	}

	.result-value {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
		color: #2c3034;
	}
</style>
