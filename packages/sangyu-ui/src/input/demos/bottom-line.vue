<docs>
---
title: Bottom-Line 输入框
---
展示极简的底部线条样式，可搭配前后图标、label 与不同焦点颜色，适合需要轻量感的表单或暗色背景。
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
                type="bottom-line"
                focu-line="primary"
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
                type="bottom-line"
                focu-line="success"
            ></SyInput>
            <SyInput
                v-model="value"
                type="bottom-line"
                label="用户名"
                size="large"
                bg-color="white"
                label-color="error"
                focus-color="error"
                focuLine="error"
            ></SyInput>
        </div>
        <div class="content">
            <SyInput
                ref="smRef"
                v-model="value1"
                type="bottom-line"
                placeholder="请输入内容"
                size="small"
                focus-color="primary"
                focu-line="cyan"
            >
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput
                v-model="value2"
                label="请输入内容"
                focus-color="error"
                bg-color="white"
                line-color="warning"
                focu-line="error"
                label-color="error"
                type="bottom-line"
            >
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput
                v-model="value"
                type="bottom-line"
                focu-line="cyan"
                placeholder="请输入内容"
                size="large"
                focus-color="error"
            >
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
