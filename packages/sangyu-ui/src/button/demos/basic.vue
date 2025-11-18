<docs>
---
    title: 基础语法
---

这是一个基础的使用方式
</docs>
<script setup lang="ts">
    import { test } from '@sangyu-ui/utils';
    test();
    const handleCLick = () => {
        console.log('click');
    };
</script>
<template>
    <sy-button @click="handleCLick">按钮一</sy-button>
    <sy-button type="dashed" @click="handleCLick">按钮二</sy-button>
    <sy-button type="primary" @click="handleCLick">按钮三</sy-button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
