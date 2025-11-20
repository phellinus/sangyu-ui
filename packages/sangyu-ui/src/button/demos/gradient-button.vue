<docs>
---
    title: 按钮类型 - gradient
---

要添加带边缘的按钮类型，我们更改该值`flat`。

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
