<docs>
---
    title: Input - 基础使用
---

Input按钮组件的基础使用

</docs>

<template>
    <div class="content">
        value: {{ value }}
        <SyInput ref="smRef" v-model="value" placeholder="请输入内容" size="small">
            <template #prefix>
                <div>prefix</div>
            </template>
        </SyInput>
        <SyInput v-model="value" placeholder="请输入内容">
            <template #prefix>
                <div>prefix</div>
            </template>
        </SyInput>
        <SyInput v-model="value" placeholder="请输入内容" disabled size="large" />
        <SyInput v-model="test" placeholder="请输入内容" />
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import SyInput from '../input.vue';
    const value = ref('');
    const smRef = ref();
    const test = ref('');
    onMounted(() => {
        smRef.value.focus();
    });
</script>
<style scoped>
    .content {
        display: flex;
        gap: 10px;
    }
</style>
