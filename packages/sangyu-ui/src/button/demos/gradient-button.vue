<docs>
---
    title: 按钮类型 - gradient
---

`gradient` 按钮使用**渐变背景色**进行填充，是一种视觉张力更强的按钮类型。  
它通过主色 `color` 和次级渐变色 `gradient-color-secondary` 生成线性渐变，并支持调整渐变方向。

常用属性：
- `color`：渐变起始颜色  
- `gradient-color-secondary`：渐变结束颜色  
- `gradient-direction`：渐变方向（默认为 `30deg`）

适用于：
- 需要突出强操作意图的按钮  
- 需要在视觉上更引人注意的区域  
- 活动按钮、促销按钮、强调操作等场景  

使用方式：设置 `type="gradient"`。

</docs>

<template>
	<div class="content">
		<sy-button color="primary" type="gradient" @click="handleCLick">primary</sy-button>
		<sy-button color="success" type="gradient" @click="handleCLick">success</sy-button>
		<sy-button color="warning" type="gradient" @click="handleCLick">warning</sy-button>
		<sy-button color="error" type="gradient" @click="handleCLick">error</sy-button>
		<sy-button
			color="rgb(70, 130, 180)"
			gradient-color-secondary="rgb(130, 207, 23)"
			type="gradient"
			@click="handleCLick"
		>
			RGB
		</sy-button>
		<sy-button disabled type="gradient" @click="handleCLick">Disabled</sy-button>
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
