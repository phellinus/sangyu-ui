<docs>
---
title: 密码输入框
---
`password` + `showPassword` 支持明暗文切换，搭配后缀图标即可在点击时切换图标与输入类型，常见于登录/注册场景。
</docs>

<template>
    <div>
        <div class="content">
            <SyInput
                ref="smRef"
                v-model="value1"
                placeholder="请输入内容"
                password
                :showPassword="showPassword1"
                size="small"
                focus-color="primary"
                type="bottom-line"
                focu-line="primary"
            >
                <template #backicon>
                    <SyIcon
                        :name="showPassword1 ? 'preview-open' : 'preview-close'"
                        @click="showPassword1 = !showPassword1"
                    />
                </template>
            </SyInput>
            <SyInput
                v-model="value2"
                label="用户名"
                focus-color="success"
                label-color="success"
                password
                :showPassword="showPassword1"
                type="bottom-line"
                focu-line="success"
            >
                <template #suffix>
                    <SyIcon
                        :name="showPassword1 ? 'preview-open' : 'preview-close'"
                        @click="showPassword1 = !showPassword1"
                    />
                </template>
            </SyInput>
            <SyInput
                v-model="value"
                type="bottom-line"
                label="用户名"
                size="large"
                password
                bg-color="white"
                label-color="error"
                focus-color="error"
                focuLine="error"
            ></SyInput>
        </div>
        <div class="content">
            <SyInput ref="smRef" v-model="value1" placeholder="请输入内容" password size="small" focus-color="primary">
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput
                v-model="value2"
                label="请输入内容"
                focus-color="success"
                password
                bg-color="white"
                type="bottom-line"
            >
                <template #backicon>
                    <SyIcon name="search" />
                </template>
            </SyInput>
            <SyInput v-model="value" placeholder="请输入内容" password size="large" focus-color="error">
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
    const showPassword1 = ref(false);
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
