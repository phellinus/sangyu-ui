<docs>
---
title: Underline 输入框
---
突出底部描边的 `type="underline"` 样式，示例展示前后图标、label 与多尺寸组合，适合轻量型表单。
</docs>

<template>
    <div>
        <div class="content">
            <SyInput
                ref="smRef"
                v-model="value1"
                placeholder="请输入内容"
                size="small"
                focus-color="primary"
                type="underline"
            >
                <template #fronticon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput
                v-model="value2"
                label="用户名"
                focus-color="success"
                label-color="success"
                type="underline"
            ></SyInput>
            <SyInput
                v-model="value"
                type="underline"
                label="用户名"
                size="large"
                bg-color="white"
                label-color="error"
                focus-color="error"
            ></SyInput>
        </div>
        <div class="content">
            <SyInput
                ref="smRef"
                v-model="value1"
                type="underline"
                placeholder="请输入内容"
                size="small"
                focus-color="primary"
            >
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput v-model="value2" label="请输入内容" focus-color="success" bg-color="white" type="underline">
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput v-model="value" type="underline" placeholder="请输入内容" size="large" focus-color="error">
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
        //smRef.value.focus();
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
