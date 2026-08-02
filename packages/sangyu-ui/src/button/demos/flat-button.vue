<docs>
---
    title: 按钮类型 - flat
---

`flat` 类型按钮以**纯色文字 + 极轻背景色**的方式呈现操作，没有边框，也没有实心填充，是一种非常轻量的按钮样式。

当按钮未激活时，背景保持透明或极浅状态；在 hover / active 时，背景会根据主题色产生柔和的色块反馈，因此既保持低打扰，又具备清晰的可交互性。

它适用于：
- 页面信息层级较低的次级操作  
- 强调“安静”风格、不希望干扰视觉主层级的场景  
- 需要在浅色背景中保持柔和按钮表现时使用  

使用方式：将 `type` 设置为 `flat`。

</docs>

<template>
	<div class="content">
		<sy-button color="primary" type="flat" @click="handleCLick">primary</sy-button>
		<sy-button color="success" type="flat" @click="handleCLick">success</sy-button>
		<sy-button color="warning" type="flat" @click="handleCLick">warning</sy-button>
		<sy-button color="error" type="flat" @click="handleCLick">error</sy-button>
		<sy-button color="rgb(70, 130, 180)" type="flat" @click="handleCLick">RGB</sy-button>
		<sy-button disabled type="flat" @click="handleCLick">Disabled</sy-button>
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
