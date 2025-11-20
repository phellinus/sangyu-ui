<docs>
---
    title: 按钮类型 - relief
---

要添加带下划线的按钮，我们更改该值`relief`。

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
