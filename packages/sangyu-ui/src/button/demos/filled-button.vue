<docs>
---
    title: 按钮类型 - filled
---

要定义按钮类型，可以使用指令`type`并传入某种按钮类型的值，例如：`filled`。

</docs>

<template>
    <div class="content">
        <sy-button color="primary" type="filled" @click="handleCLick">primary</sy-button>
        <sy-button color="success" type="filled" @click="handleCLick">success</sy-button>
        <sy-button color="warning" type="filled" @click="handleCLick">warning</sy-button>
        <sy-button color="error" type="filled" @click="handleCLick">error</sy-button>
        <sy-button color="rgb(134, 4, 98)" type="filled" @click="handleCLick">RGB</sy-button>
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
