<docs>
---
    title: 按钮类型 - line
---

`line` 类型按钮通过**上下划线**作为视觉反馈，而不是使用边框或背景色。  
按钮文字以主题色呈现，交互时下划线会以动画方式出现，形成轻量且富有动感的操作体验。

`line` 类型支持：
- `line-origin` 控制划线动画的起始方向（`left`、`right`、`center`）
- `line-position` 控制划线出现的位置（`top` 或 `bottom`）

它适用于：
- 风格轻盈、强调文字内容的场景  
- 链接式按钮、导航、筛选等操作  
- 页面需要保持信息视觉层级低干扰时  

使用方式：设置 `type="line"`。

</docs>

<template>
	<div class="content">
		<sy-button color="primary" type="line" @click="handleCLick">primary</sy-button>
		<sy-button color="success" type="line" @click="handleCLick">success</sy-button>
		<sy-button color="warning" type="line" line-origin="left" @click="handleCLick">warning</sy-button>
		<sy-button color="error" type="line" line-position="top" @click="handleCLick">error</sy-button>
		<sy-button color="rgb(70, 130, 180)" type="line" @click="handleCLick">RGB</sy-button>
		<sy-button disabled type="line" @click="handleCLick">Disabled</sy-button>
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
