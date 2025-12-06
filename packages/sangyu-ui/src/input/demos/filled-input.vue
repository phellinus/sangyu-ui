<docs>
---
    title: filled类型的输入框
---

filled类型是SyInput的默认类型

</docs>

<template>
    value: {{ value }}
    <div class="content">
        <SyInput ref="smRef" v-model="value" placeholder="请输入内容" size="small"></SyInput>
        <SyInput v-model="value" label="请输入内容"></SyInput>
        <SyInput v-model="value" placeholder="请输入内容" size="large"></SyInput>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import SyInput from '../input.vue';
    const value = ref('');
    const smRef = ref();
</script>
<style scoped>
    .content {
        display: flex;
        align-items: flex-start;
        gap: 10px;
    }
</style>
