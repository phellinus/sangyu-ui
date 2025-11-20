<docs>
---
    title: 按钮圆角
---

目前提供三种组件库small default large三种尺寸，通过`radius`属性进行设置。
</docs>

<template>
    <div class="content">
        <sy-button radius="small" color="primary" @click="handleCLick">按钮一</sy-button>
        <sy-button color="success" @click="handleCLick">按钮二</sy-button>
        <sy-button radius="large" color="warning" @click="handleCLick">按钮三</sy-button>
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
