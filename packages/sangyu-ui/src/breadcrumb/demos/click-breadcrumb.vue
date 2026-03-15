<docs>
---
title: SyBreadCrumb 点击事件
---

SyBreadCrumb 通过设置 handleClick 属性可以监听点击事件，handleClick 接收一个参数 to，表示当前点击的面包屑的路径。
</docs>

<template>
	<div>
		<SyBreadCrumb separator="/" custom-style="margin-bottom: 20px" :handleClick="handleToPath">
			<SyBreadcrumbItem to="/">首页</SyBreadcrumbItem>
			<SyBreadcrumbItem to="/component">组件库</SyBreadcrumbItem>
			<SyBreadcrumbItem to="/component/breadcrumb">面包屑</SyBreadcrumbItem>
		</SyBreadCrumb>
		<SyBreadCrumb separator-icon="arrow-right" :handleClick="handleToPath">
			<SyBreadcrumbItem to="/">
				<SyIcon name="home" />
				首页
			</SyBreadcrumbItem>
			<SyBreadcrumbItem to="/component">
				<SyIcon name="more-app" />
				应用中心
			</SyBreadcrumbItem>
			<SyBreadcrumbItem to="/component/breadcrumb">应用详情</SyBreadcrumbItem>
		</SyBreadCrumb>
	</div>
</template>

<script setup>
	import { SyIcon } from '@sangyu-ui/icons';
	import { SyBreadCrumb } from 'sangyu-ui';

	const handleToPath = (e) => {
		console.log(e);
	};
</script>

<style lang="scss" scoped></style>
