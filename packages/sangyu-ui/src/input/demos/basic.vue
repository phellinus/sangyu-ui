<docs>
---
    title: Input - 基础使用
---

Input按钮组件的基础使用

</docs>

<template>
    <div class="content">
        <SyInput placeholder="请输入内容" />
    </div>
</template>

<script setup lang="ts">
    import SyInput from '../input.vue';
</script>
<style scoped>
    .content {
        display: flex;
        gap: 10px;
    }
</style>
