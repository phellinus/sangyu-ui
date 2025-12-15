<docs>
---
    title: 按钮类型 - relief
---

`relief` 是一种具有**立体浮起效果**的按钮类型。  
它通过更深的底色和轻微的位移动画模拟实体按钮的“浮起”和“按下”状态，让按钮呈现更真实的触感反馈。

特点：
- 按钮主体使用主题色  
- 底部有一条更暗的阴影条，形成立体效果  
- 鼠标悬浮和点击时具有轻微的按压反馈  
- 默认文字颜色为白色或自定义 `textColor`

适用于：
- 强交互、需要“实体感”的场景  
- 游戏风格 / 仿物理风格按钮  
- 突出主操作或品牌调性  

使用方式：设置 `type="relief"`。

</docs>

<template>
	<div class="content">
		<sy-button color="primary" type="relief" @click="handleCLick">primary</sy-button>
		<sy-button color="success" type="relief" @click="handleCLick">success</sy-button>
		<sy-button color="warning" type="relief" @click="handleCLick">warning</sy-button>
		<sy-button color="error" type="relief" @click="handleCLick">error</sy-button>
		<sy-button color="rgb(70, 130, 180)" type="relief" @click="handleCLick">RGB</sy-button>
		<sy-button disabled type="relief" @click="handleCLick">Disabled</sy-button>
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
