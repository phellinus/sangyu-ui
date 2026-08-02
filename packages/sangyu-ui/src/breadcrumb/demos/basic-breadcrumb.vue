<docs>
---
title: SyBreadCrumb 面包屑基本用法
---

SyBreadCrumb 面包屑基本用法
</docs>

<template>
	<div>
		<SyBreadCrumb>
			<SyBreadcrumbItem to="/">首页</SyBreadcrumbItem>
			<SyBreadcrumbItem to="/component">组件库</SyBreadcrumbItem>
			<SyBreadcrumbItem to="/component/breadcrumb">面包屑</SyBreadcrumbItem>
		</SyBreadCrumb>
	</div>
</template>

<script setup>
import { SyBreadCrumb } from 'sangyu-ui';
</script>

<style lang="scss" scoped></style>
