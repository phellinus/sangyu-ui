<docs>
---
    title: 按钮类型 - line
---

要添加带下划线的按钮，我们更改该值`line`。

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
