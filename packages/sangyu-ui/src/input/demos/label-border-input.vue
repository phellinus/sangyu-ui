<docs>
---
title: Label-Border 输入框
---
结合描边与浮动标签的视觉样式，label 在聚焦或有值时上浮，可自定义边框、背景与焦点颜色，适合需要占位提示的复杂表单。
</docs>

<template>
    <div class="content">
        <SyInput
            ref="smRef"
            v-model="value1"
            type="label-border"
            border-color="primary"
            focus-color="success"
            label="请输入内容"
            size="small"
            bg-color="white"
        ></SyInput>
        <SyInput v-model="value2" label="请输入内容" type="label-border" bg-color="white"></SyInput>
        <SyInput
            v-model="value"
            label="请输入内容"
            type="label-border"
            border-color="warning"
            bg-color="white"
            focus-color="error"
            size="large"
        ></SyInput>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import SyInput from '../input.vue';
    const value = ref('');
    const value1 = ref('');
    const value2 = ref('');
    const smRef = ref();
    onMounted(() => {
        //smRef.value.focus();
    });
</script>
<style scoped>
    .content {
        display: flex;
        align-items: flex-start;
        gap: 10px;
    }
</style>
