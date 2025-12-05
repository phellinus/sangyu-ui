<docs>
---
    title: Input - 基础使用
---

Input按钮组件的基础使用

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
        <SyInput v-model="value" label="请输入内容" type="label-border" size="large"></SyInput>
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
        smRef.value.focus();
    });
</script>
<style scoped>
    .content {
        display: flex;
        align-items: flex-start;
        gap: 10px;
    }
</style>
