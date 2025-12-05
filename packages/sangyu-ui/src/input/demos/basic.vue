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
                <div>A</div>
            </template>
        </SyInput>
        <SyInput v-model="value" placeholder="请输入内容" width="90px" disabled>
            <template #prefix>
                <div>A</div>
            </template>
        </SyInput>
        <SyInput v-model="value" placeholder="请输入内容" size="large">
            <template #prefix>
                <div>A</div>
            </template>
        </SyInput>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import SyInput from '../input.vue';
    const value = ref('');
    const smRef = ref();
    const test = ref('');
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
