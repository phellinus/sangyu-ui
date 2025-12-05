<docs>
---
    title: Input - 基础使用
---

Input按钮组件的基础使用

</docs>

<template>
    <div>
        <div class="content">
            <SyInput ref="smRef" v-model="value1" size="small" focus-color="primary">
                <template #fronticon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput v-model="value2" placeholder="请输入内容" focus-color="success">
                <template #fronticon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput v-model="value" placeholder="请输入内容" size="large" focus-color="error">
                <template #fronticon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
        </div>
        <div class="content">
            <SyInput ref="smRef" v-model="value1" placeholder="请输入内容" size="small" focus-color="primary">
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput v-model="value2" placeholder="请输入内容" focus-color="success">
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput v-model="value" placeholder="请输入内容" size="large" focus-color="error">
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { SyIcon } from '@sangyu-ui/icons';
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
        margin-top: 10px;
        align-items: flex-start;
        gap: 10px;
    }
</style>
