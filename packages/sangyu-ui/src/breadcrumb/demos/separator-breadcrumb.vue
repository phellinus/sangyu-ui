<docs>
---
title: SyBreadCrumb 分隔符
---

SyBreadCrumb通过设置separator属性可以自定义分隔符，默认分隔符为"/"，也可以通过separatorIcon属性设置分隔符图标。
</docs>

<template>
	<div>
		<SyBreadCrumb separator=">">
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
