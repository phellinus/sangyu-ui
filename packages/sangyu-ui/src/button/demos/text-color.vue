<docs>
---
    title: 按钮的文字颜色-textColor
---

- sy-button 提供 textColor 属性，用于自定义按钮的文字颜色。
- 所有按钮类型（filled、border、flat、line、gradient、relief 等）都可以使用 textColor，并且与 color（按钮主色）独立。

- 你可以通过 textColor 让按钮文字更具视觉对比、层次感，达到更好的配色效果。

</docs>

<template>
	<div class="content">
		<sy-button color="primary" textColor="#E0FFFF" type="filled" @click="handleCLick">SangYu</sy-button>
		<sy-button color="success" textColor="#1E7F34" type="border" @click="handleCLick">SangYu</sy-button>
		<sy-button color="warning" textColor="#409eff" type="flat" @click="handleCLick">SangYu</sy-button>
		<sy-button color="error" textColor="#D62828" type="line" @click="handleCLick">SangYu</sy-button>
		<sy-button
			color="rgb(70, 130, 180)"
			gradientColorSecondary="rgb(10, 80, 10)"
			textColor="#F0F8FF"
			type="gradient"
			@click="handleCLick"
		>
			SangYu
		</sy-button>
		<sy-button color="blue" textColor="#ffffff" type="relief" @click="handleCLick">SangYu</sy-button>
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
