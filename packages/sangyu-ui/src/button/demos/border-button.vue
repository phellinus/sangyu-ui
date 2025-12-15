<docs>
---
    title: 按钮类型 - border
---

`border` 类型按钮以**描边形式**呈现操作，不填充背景色，视觉上更加轻量、柔和。  
它与 `color` 属性搭配使用时，会以指定主题色作为按钮描边与文字颜色，整体风格简洁清晰。

该类型适用于：
- 页面中层级较轻的次要操作  
- 不希望过度抢眼的功能按钮  
- 需要与背景保持更高对比度与信息层次时使用  

使用方式：将 `type` 设置为 `border`。

</docs>

<template>
	<div class="content">
		<sy-button color="primary" type="border" @click="handleCLick">primary</sy-button>
		<sy-button color="success" type="border" @click="handleCLick">success</sy-button>
		<sy-button color="warning" type="border" @click="handleCLick">warning</sy-button>
		<sy-button color="error" type="border" @click="handleCLick">error</sy-button>
		<sy-button color="rgb(70, 130, 180)" type="border" @click="handleCLick">RGB</sy-button>
		<sy-button disabled type="border" @click="handleCLick">Disabled</sy-button>
	</div>
</template>

<script setup lang="ts">
	const handleCLick = () => {
		console.log('click');
	};
</script>
<style scoped>
	.content {
		display: flex;
		gap: 10px;
	}
</style>
