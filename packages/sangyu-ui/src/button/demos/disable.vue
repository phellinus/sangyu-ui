<docs>
---
    title: 禁用状态
---

按钮添加disabled属性,达到禁用效果
</docs>

<template>
    <div class="content">
        <sy-button disabled type="filled" @click="handleCLick">Disabled</sy-button>
        <sy-button disabled type="border" @click="handleCLick">Disabled</sy-button>
        <sy-button disabled type="flat" @click="handleCLick">Disabled</sy-button>
        <sy-button disabled type="line" @click="handleCLick">Disabled</sy-button>
        <sy-button disabled type="gradient" @click="handleCLick">Disabled</sy-button>
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
