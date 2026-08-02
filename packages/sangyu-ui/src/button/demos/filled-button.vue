<docs>
---
    title: 按钮类型 - filled
---

`filled` 是按钮的默认样式类型，特点是**以主题色作为按钮背景色**，并使用清晰明确的前景色（文字颜色）来提升可读性。

当你希望按钮在页面中更醒目、更具操作引导性时，推荐使用 `filled` 类型。

通过设置 `type="filled"` 并搭配 `color` 属性，你可以快速构建出不同语义的主按钮，例如：主操作、成功、警告或危险操作。

</docs>

<template>
	<div class="content">
		<sy-button color="primary" type="filled" @click="handleCLick">primary</sy-button>
		<sy-button color="success" type="filled" @click="handleCLick">success</sy-button>
		<sy-button color="warning" type="filled" @click="handleCLick">warning</sy-button>
		<sy-button color="error" type="filled" @click="handleCLick">error</sy-button>
		<sy-button color="rgb(70, 130, 180)" type="filled" @click="handleCLick">RGB</sy-button>
		<sy-button disabled type="filled" @click="handleCLick">Disabled</sy-button>
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
