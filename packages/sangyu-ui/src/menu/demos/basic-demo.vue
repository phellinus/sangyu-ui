<template>
	<div class="menu-demo">
		<div class="menu-section">
			<p class="menu-title">Vertical</p>
			<sy-menu defaultIndex="1">
				<sy-menu-item index="1" icon="more-app">Workspace</sy-menu-item>
				<sy-sub-menu index="sub-1" title="User">
					<sy-menu-item index="2" icon="home">Admins</sy-menu-item>
					<sy-menu-item index="3" icon="more-app">Members</sy-menu-item>
					<sy-menu-item index="4" icon="close-one">Banned</sy-menu-item>
				</sy-sub-menu>
				<sy-sub-menu index="sub-2" title="Content">
					<sy-menu-item index="5" icon="book-mark">Articles</sy-menu-item>
					<sy-menu-item index="6" icon="tips">Comments</sy-menu-item>
				</sy-sub-menu>
				<sy-menu-item index="7" icon="settings">Settings</sy-menu-item>
			</sy-menu>
		</div>
		<div class="menu-section">
			<p class="menu-title">Horizontal</p>
			<sy-menu mode="horizontal" defaultIndex="h1">
				<sy-menu-item index="h1" icon="home">Overview</sy-menu-item>
				<sy-menu-item index="h2" icon="more-app">Docs</sy-menu-item>
				<sy-sub-menu index="h-sub-1" title="Config">
					<sy-menu-item index="h3">Theme</sy-menu-item>
					<sy-menu-item index="h4">Tokens</sy-menu-item>
					<sy-menu-item index="h5">i18n</sy-menu-item>
				</sy-sub-menu>
				<sy-menu-item index="h6">Upgrade</sy-menu-item>
			</sy-menu>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { SyMenu } from 'sangyu-ui';
</script>

<style scoped>
	.menu-demo {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.menu-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.menu-title {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
		color: #2c3034;
	}
</style>
