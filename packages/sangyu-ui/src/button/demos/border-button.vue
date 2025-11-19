<docs>
---
    title: 按钮类型 - border
---

要添加带边缘的按钮类型，我们更改该值。例如：`border`。

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
