<docs>
---
title: SyMenu expand
---

SyMenu 通过 `expand` 属性控制菜单的展开收缩
</docs>

<template>
	<div class="menu-expand-demo">
		<p class="menu-expand-desc">通过 expand 控制垂直菜单展开与收起。收起状态下仅显示图标， 悬浮可展开子菜单。</p>
		<sy-menu defaultIndex="1" :expand="expand">
			<sy-menu-item index="1" icon="home">Dashboard</sy-menu-item>
			<sy-sub-menu index="sub-1" title="Users" icon="equalizer">
				<sy-menu-item index="2" icon="loading">Admins</sy-menu-item>
				<sy-menu-item index="3" icon="more-app">Members</sy-menu-item>
				<sy-menu-item index="4" icon="waterfalls-v">Banned</sy-menu-item>
			</sy-sub-menu>
			<sy-sub-menu index="sub-2" title="Content" icon="radar">
				<sy-menu-item index="5" icon="translate">Articles</sy-menu-item>
				<sy-menu-item index="6" icon="tag">Comments</sy-menu-item>
			</sy-sub-menu>
			<sy-menu-item index="7" icon="setting-three">Settings</sy-menu-item>
		</sy-menu>
		<div>
			<sy-button @click="expand = !expand">{{ expand ? 'Collapse' : 'Expand' }}</sy-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { SyMenu, SyButton } from 'sangyu-ui';
	import { ref } from 'vue';
	const expand = ref(false);
</script>

<style scoped>
	.menu-expand-demo {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.menu-expand-desc {
		margin: 0;
		font-size: 14px;
		color: #6a7076;
	}

	.menu-expand-desc code {
		padding: 0 4px;
		background: rgba(44, 48, 52, 0.08);
		border-radius: 4px;
		color: #2c3034;
	}
</style>
