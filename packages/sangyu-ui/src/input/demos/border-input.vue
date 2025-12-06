<docs>
---
    title: border 类型的输入框
---

Input按钮组件的基础使用

</docs>

<template>
    <div class="content">
        <SyInput
            ref="smRef"
            v-model="value1"
            label="请输入内容"
            size="small"
            type="border"
            bg-color="white"
            focus-color="primary"
            label-color="primary"
        ></SyInput>
        <SyInput
            v-model="value2"
            type="border"
            placeholder="请输入内容"
            border-color="warning"
            focus-color="error"
        ></SyInput>
        <SyInput
            v-model="value"
            type="border"
            label="请输入内容"
            size="large"
            bg-color="white"
            focus-color="success"
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
